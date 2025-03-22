const os = require("node:os");
const path = require("node:path");

const toolchainUtils = {
  ASM_COMPILER: "clang",
  C_COMPILER:   "clang",
  CXX_COMPILER: "clang++",
  AR:           "llvm-ar",
  RANLIB:       "llvm-ranlib",
  LINKER:       "wasm-ld",
  NM:           "llvm-nm",
  OBJCOPY:      "llvm-objcopy",
  OBJDUMP:      "llvm-objdump",
  STRIP:        "llvm-strip",
  LLVM_LLC:     "llc",
};

const toolchainSettings = {
  WASMUX_NO_START_FILES: true,
  WASMUX_NO_ENTRY: true,
  WASMUX_NO_STDLIB: true,
  WASMUX_NODEFAULTLIBS: true,
  WASMUX_EXPORT_DYNAMIC: true,
  WASMUX_STACK_FIRST: true,
  WASMUX_STACK_SIZE: 65536,
  WASMUX_IMPORT_MEMORY: true,
  WASMUX_MAX_MEMORY: 2147483648,
  WASMUX_GLOBAL_BASE: 0,
  WASMUX_NO_GC_SECTIONS: true,
  WASMUX_LLVM_RTLIB: "",
  WASMUX_LLVM_LTO: false,
  WASMUX_LLVM_USE_FIND_UNIX_PATHS: false,
  WASMUX_SHARED_MEMORY: true,
};

module.exports = function(mk)
{
  mk.SYSTEM_NAME = mk.SYSTEM_NAME || "Generic";
  const clangPath = mk.findProgram("clang");
  const toolchainPrefix = clangPath ? path.posix.dirname(clangPath) : "";
  const toolchainSuffix = (os.platform() === "win32") ? ".exe" : "";

  for (const [key, val] of Object.entries(toolchainUtils)) {
    const filename = val + toolchainSuffix;
    mk[key] = toolchainPrefix ? path.posix.resolve(toolchainPrefix, filename) : filename;
  }

  for (const [key, val] of Object.entries(toolchainSettings)) {
    mk[key] = val;
  }

  const compilerFlags = [
    "--target=" + mk.WASMUX_TARGET_TRIPLET,
    "-matomics",
    "-mmultivalue",
    "-mbulk-memory",
  ];

  if (mk.WASMUX_NO_STDLIB)
    compilerFlags.push("--no-standard-libraries");

  // if (mk.SYSTEM_NAME === "Linux")
  //   compilerFlags.push("-D__linux__");

  const objectFlags = [];

  if (mk.WASMUX_ENABLE_EH)
    objectFlags.push("-mllvm", "-wasm-enable-eh");

  if (mk.WASMUX_ENABLE_SJLJ)
    objectFlags.push("-mllvm", "-wasm-enable-sjlj");

  if (mk.WASMUX_ENABLE_EMSCRIPTEN_SJLJ)
    objectFlags.push("-mllvm", "-enable-emscripten-sjlj");

  if (mk.WASMUX_ENABLE_EMSCRIPTEN_CXX_EXCEPTIONS)
    objectFlags.push("-mllvm", "-enable-emscripten-cxx-exceptions");

  mk.ASM_FLAGS.push(...compilerFlags);
  mk.C_FLAGS.push(...compilerFlags, "-O3");
  mk.CXX_FLAGS.push(...compilerFlags, "-O3");

  mk.SHARED_LINKER_FLAGS.push("-mexec-model=reactor", "-Wl,--no-entry");

  if (mk.WASMUX_NO_START_FILES)
    mk.EXE_LINKER_FLAGS.push("-nostartfiles");

  if (mk.WASMUX_NO_ENTRY)
    mk.EXE_LINKER_FLAGS.push("-Wl,--no-entry");

  if (mk.WASMUX_IMPORT_MEMORY) {
    mk.EXE_LINKER_FLAGS.push("-Wl,--import-memory");
    mk.SHARED_LINKER_FLAGS.push("-Wl,--import-memory");
  }

  if (mk.WASMUX_EXPORT_DYNAMIC)
    mk.SHARED_LINKER_FLAGS.push("-Wl,--export-dynamic");

  if (mk.WASMUX_SHARED_MEMORY) {
    mk.EXE_LINKER_FLAGS.push("-Wl,--shared-memory");
    mk.SHARED_LINKER_FLAGS.push("-Wl,--shared-memory");
  }

  if (mk.WASMUX_MAX_MEMORY) {
    mk.EXE_LINKER_FLAGS.push("-Wl,--max-memory=" + mk.WASMUX_MAX_MEMORY);
    mk.SHARED_LINKER_FLAGS.push("-Wl,--max-memory=" + mk.WASMUX_MAX_MEMORY);
  }

  if (mk.WASMUX_NODEFAULTLIBS) {
    mk.EXE_LINKER_FLAGS.push("-nodefaultlibs");
    mk.SHARED_LINKER_FLAGS.push("-nodefaultlibs");
  }

  if (mk.WASMUX_STACK_FIRST)
    mk.EXE_LINKER_FLAGS.push("-Wl,--stack-first");

  if (mk.WASMUX_STACK_SIZE)
    mk.EXE_LINKER_FLAGS.push("-z", "stack-size=" + mk.WASMUX_STACK_SIZE);

  if (mk.WASMUX_GLOBAL_BASE)
    mk.EXE_LINKER_FLAGS.push("-Wl,--global-base=" + mk.WASMUX_GLOBAL_BASE);

  if (mk.WASMUX_NO_GC_SECTIONS)
    mk.EXE_LINKER_FLAGS.push("-Wl,--no-gc-sections");

  if (mk.WASMUX_LLVM_RTLIB) {
    mk.EXE_LINKER_FLAGS.push("-rtlib=" + mk.WASMUX_LLVM_RTLIB);
    mk.SHARED_LINKER_FLAGS.push("-rtlib=" + mk.WASMUX_LLVM_RTLIB);
  }

  if (mk.WASMUX_LLVM_LTO) {
    mk.CXX_FLAGS.push("-flto");
    mk.EXE_LINKER_FLAGS.push("-Wl,--lto-O3");
    mk.SHARED_LINKER_FLAGS.push("-Wl,--lto-O3");
  }

  if (mk.WASMUX_LLVM_USE_FIND_UNIX_PATHS) {
    mk.C_FLAGS.push(`--include-directory=${mk.SYSROOT}/usr/include`);
    mk.CXX_FLAGS.push(`--include-directory=${mk.SYSROOT}/usr/include`);
    mk.EXE_LINKER_FLAGS.push(`--library-directory=${mk.SYSROOT}/usr/lib`);
    mk.SHARED_LINKER_FLAGS.push(`--library-directory=${mk.SYSROOT}/usr/lib`);
  }

  if (mk.SYSTEM_PROCESSOR === "wasm64") {
    mk.OBJECT_LINKER_FLAGS.push("-mwasm64");
  }
}
