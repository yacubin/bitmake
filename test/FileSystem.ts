import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { fetchBuffer } from "@/utils/FileSystem";
import { Locator } from "@/utils/Locator";
import { USER_CONFIG } from "@/Constants";
import init from "@/commands/init";

function mockFetch(body: string, status: number, statusText: string) {
  return jest.spyOn(global, "fetch").mockResolvedValue(new Response(body, { status, statusText }));
}

describe("FileSystem", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bitmake-test-"));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe("fetchBuffer", () => {
    it("returns the body of a successful https response", async () => {
      const spy = mockFetch("preset content", 200, "OK");
      const data = await fetchBuffer("https://example.com/preset.mjs");
      expect(spy).toHaveBeenCalledWith("https://example.com/preset.mjs");
      expect(data.toString("utf8")).toBe("preset content");
    });

    it("returns the body of a successful http response", async () => {
      mockFetch("preset content", 200, "OK");
      const data = await fetchBuffer("http://example.com/preset.mjs");
      expect(data.toString("utf8")).toBe("preset content");
    });

    it("throws for a 404 response", async () => {
      mockFetch("<html>Not Found</html>", 404, "Not Found");
      await expect(fetchBuffer("https://example.com/missing.mjs"))
        .rejects.toThrow("Failed to fetch 'https://example.com/missing.mjs': 404 Not Found");
    });

    it("throws for a 500 response", async () => {
      mockFetch("Internal Server Error", 500, "Internal Server Error");
      await expect(fetchBuffer("https://example.com/preset.mjs"))
        .rejects.toThrow("Failed to fetch 'https://example.com/preset.mjs': 500 Internal Server Error");
    });

    it("propagates network errors", async () => {
      jest.spyOn(global, "fetch").mockRejectedValue(new TypeError("fetch failed"));
      await expect(fetchBuffer("https://example.com/preset.mjs")).rejects.toThrow("fetch failed");
    });

    it("reads a local file without fetching", async () => {
      const spy = jest.spyOn(global, "fetch");
      const file = path.join(tmpDir, "preset.mjs");
      fs.writeFileSync(file, "local content");
      const data = await fetchBuffer(file);
      expect(spy).not.toHaveBeenCalled();
      expect(data.toString("utf8")).toBe("local content");
    });
  });

  describe("init", () => {
    function options(preset: string) {
      return {
        argv: [],
        nodePath: "",
        handler: "init",
        workDir: Locator.create(tmpDir),
        env: { preset },
      };
    }

    it("installs a preset from a successful response", async () => {
      mockFetch("export default {};", 200, "OK");
      await init(options("https://example.com/preset.mjs"));
      expect(fs.readFileSync(path.join(tmpDir, USER_CONFIG), "utf8")).toBe("export default {};");
    });

    it("keeps the existing config when the preset is not found", async () => {
      const configPath = path.join(tmpDir, USER_CONFIG);
      fs.writeFileSync(configPath, "existing config");
      mockFetch("<html>Not Found</html>", 404, "Not Found");

      await expect(init(options("https://example.com/missing.mjs"))).rejects.toThrow("404 Not Found");
      expect(fs.readFileSync(configPath, "utf8")).toBe("existing config");
    });

    it("does not create a config when the preset is not found", async () => {
      mockFetch("<html>Not Found</html>", 404, "Not Found");

      await expect(init(options("https://example.com/missing.mjs"))).rejects.toThrow("404 Not Found");
      expect(fs.existsSync(path.join(tmpDir, USER_CONFIG))).toBe(false);
    });
  });
});
