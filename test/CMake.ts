import { cmakeVariablesAsArgs } from "@/cmake/index";

describe("CMake", () => {
  it("cmakeVariablesAsArgs", () => {
    const args = cmakeVariablesAsArgs({
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_MODULE_PATH: "/opt/cmake",
    });
    expect(args).toStrictEqual([
      "-D", "CMAKE_INSTALL_PREFIX=/usr",
      "-D", "CMAKE_MODULE_PATH=/opt/cmake",
    ]);
  });
});
