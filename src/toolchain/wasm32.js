const baseToolchain = require("./common.js");

module.exports = function(mk)
{
  mk.WASMUX_TARGET_TRIPLET = "wasm32-unknown-unknown";
  mk.SYSTEM_PROCESSOR = "wasm32";
  mk.SIZEOF_VOID_P = 4;

  baseToolchain(mk);
}
