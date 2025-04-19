# BitMake project

!The project is under development.

BitMake was part of the WASMUX project and served as a build script.
The main task of BitMake is to build recipes and make scripts.

Examples of building a dbc-0.0.1 project:
```
export PATH=/opt/apps/llvm-project-llvmorg-19.1.3/bin:$PATH           # Path to clang compiler
wget https://github.com/ykbin/dbc/archive/refs/tags/v0.0.1.tar.gz
tar -xvf ./v0.0.1.tar.gz
cd dbc-0.0.1/
npm init -y
npm install wasmux --save-dev                                         # Standard libraries and tolchain
npx bitmake init --preset wasmux/cmake                                # Predefined recipe for cmake and wasm32
npx bitmake build                                                     # Build
 ```

Examples of building a sed-4.9 project:
```
export PATH=/opt/apps/llvm-project-llvmorg-19.1.3/bin:$PATH           # Path to clang compiler
wget https://ftp.gnu.org/gnu/sed/sed-4.9.tar.gz
tar -xvf ./sed-4.9.tar.gz 
cd sed-4.9/
npm init -y
npm install wasmux --save-dev                                         # Standard libraries and tolchain
npx bitmake init --preset wasmux/gnu-configure                        # Predefined recipe for configure and wasm32
npx bitmake build                                                     # Build
 ```

Examples of make scripts:
```
export default (mk) => {
  const sources = [
    "waeditor.cpp",
  ];

  const includes = [
    mk.BINARY_DIR.join("include"),
    mk.SOURCE_DIR.join("include"),
  ];

  const libraries = [
    mk.target("wabase"),
  ];

  const waeditor = mk.addExecutable("waeditor", sources);
  waeditor.addIncludes(includes);
  waeditor.addLibraries(libraries);

  mk.install(waeditor, "bin");
}
```

Examples of make recipes:
* [nlohmann](https://github.com/ykbin/PkgExtras/blob/develop/MakeRecipes/nlohmann.mjs)
* [libhv-static](https://github.com/ykbin/PkgExtras/blob/develop/MakeRecipes/libhv-static.mjs)
