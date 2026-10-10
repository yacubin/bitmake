import { Args } from "@/utils/Args";

describe("Args", () => {
  describe("toObject", () => {
    it("returns an empty object for no arguments", () => {
      expect(Args.toObject([])).toStrictEqual({});
    });

    it("sets a flag without a value to true", () => {
      expect(Args.toObject([ "--verbose" ])).toStrictEqual({ verbose: true });
    });

    it("assigns a single value as a string", () => {
      expect(Args.toObject([ "--target", "app" ])).toStrictEqual({ target: "app" });
    });

    it("collects multiple values into an array", () => {
      expect(Args.toObject([ "--target", "a", "b", "c" ])).toStrictEqual({ target: [ "a", "b", "c" ] });
    });

    it("parses several options", () => {
      expect(Args.toObject([ "--verbose", "--target", "a", "b", "--jobs", "4" ])).toStrictEqual({
        verbose: true,
        target: [ "a", "b" ],
        jobs: "4",
      });
    });

    it("converts hyphenated names to camelCase", () => {
      expect(Args.toObject([ "--build-type", "Release" ])).toStrictEqual({ buildType: "Release" });
      expect(Args.toObject([ "--a-b-c" ])).toStrictEqual({ aBC: true });
    });

    it("lowercases option names", () => {
      expect(Args.toObject([ "--BUILD-Type" ])).toStrictEqual({ buildType: true });
    });

    it("allows digits after the first character", () => {
      expect(Args.toObject([ "--c99" ])).toStrictEqual({ c99: true });
      expect(Args.toObject([ "--opt-2" ])).toStrictEqual({ opt2: true });
    });

    it("throws for a value before any option", () => {
      expect(() => Args.toObject([ "value" ])).toThrow("Need to specify the option name before 'value' parameter");
    });

    it("throws for a repeated option", () => {
      expect(() => Args.toObject([ "--target", "a", "--target", "b" ])).toThrow("Cannot specify the same option '--target' more than once");
    });

    it("throws for options that map to the same key", () => {
      expect(() => Args.toObject([ "--BuildType", "--buildtype" ])).toThrow("Cannot specify the same option '--buildtype' more than once");
    });

    it.each([
      [ "--" ],
      [ "--1abc" ],
      [ "---abc" ],
      [ "--abc-" ],
      [ "--a--b" ],
      [ "--build-type=Release" ],
      [ "--foo_bar" ],
      [ "--foo.bar" ],
      [ "--foo bar" ],
      [ "--foo/bar" ],
      [ "--föo" ],
    ])("throws for unsupported option %s", (option) => {
      expect(() => Args.toObject([ option ])).toThrow(`Option ${option} is not supported`);
    });

    it("does not treat values starting with a single hyphen as options", () => {
      expect(Args.toObject([ "--define", "-DFOO" ])).toStrictEqual({ define: "-DFOO" });
    });
  });
});
