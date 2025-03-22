const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function spawnAsync(command, args, options) {
  let fd = null;
  let verbose = false;
  if (options && options.extra) {
    if (options.extra.verbose)
      verbose = true;
    if (options.extra.output) {
      let logfile = options.extra.output;
      if (!path.isAbsolute(logfile) && options.cwd) {
        logfile = path.resolve(options.cwd, logfile);
      }
      fd = fs.openSync(logfile, 'w+', 0o666);
    }
  }
  return new Promise((resolve, reject) => {
    if (fd || verbose) {
      verbose && console.info([ path.basename(command), ...args ].join(' '));
      fd && fs.writeSync(fd, JSON.stringify({command, args, options }, null, 2) + "\n");
    }
    const exec = spawn(command, args, options);
    exec.stdout.on('data', (data) => {
      process.stdout.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.stderr.on('data', (data) => {
      process.stderr.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.on('close', (status) => {
      fd && fs.closeSync(fd);
      resolve({status});
    });
  });
}

module.exports = {
  spawnAsync,
};
