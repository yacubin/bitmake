const NOT_IMPLEMENTED = 'NotImplemented';
const BOTH = 'both';

module.exports.loadWebcalls = function(input, side)
{
  if (side !== BOTH && side !== 'main' && side !== 'worker')
    throw `Unknown '${side}' side name`;

  const arr = require(input);
  
  const result = [];
  for (const iter of arr) {
    const name = (side === BOTH || iter.side === BOTH || iter.side === side) ? iter.name : NOT_IMPLEMENTED;
    result.push(name);
  }

  return result;
}
