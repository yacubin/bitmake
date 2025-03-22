export default {
  "bundle:wasmux": {
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_TOOLCHAIN_FILE: "${wasmuxRoot}/cmake/wasm64-toolchain.cmake",
      CMAKE_INSTALL_PREFIX: "/usr",
      WASMUX_ENABLE_THREADS: true,
      WASMUX_ENABLE_KERNEL: false,
      WASMUX_ENABLE_LIBC: true,
      WASMUX_ENABLE_CRT: true,
      WASMUX_ENABLE_LIBM: true,
      WASMUX_ENABLE_DL: true,
      WASMUX_ENABLE_MAIN_ENV_ARG: false,
    },
    sourceDir: "${wasmuxRoot}",
    destDir: "${binaryRoot}/sysroot",
  },

  "bundle:output": {
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_TOOLCHAIN_FILE: "${bundle:wasmux.destDir}/share/wasmux/wasm64.toolchain.cmake",
      CMAKE_INSTALL_PREFIX: "/usr",
    },
    sourceDir: "${sourceRoot}",
    destDir: "${binaryRoot}/output",
  },
};
