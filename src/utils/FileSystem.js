const fs = require('fs');
const path = require('path');

async function pathExists(path)
{
  try {
    return !!(await fs.promises.stat(path));
  } catch {
    return false;
  }
}

function pathExistsSync(path)
{
  try {
    return !!fs.statSync(path);
  } catch {
    return false;
  }
}

async function fileExists(path)
{
  try {
    return (await fs.promises.stat(path)).isFile();
  } catch {
    return false;
  }
}

function fileExistsSync(path)
{
  try {
    return fs.statSync(path).isFile();
  } catch {
    return false;
  } 
}

async function directoryExists(path)
{
  try {
    return (await fs.promises.stat(path)).isDirectory();
  } catch {
    return false;
  }
}

function directoryExistsSync(path)
{
  try {
   return fs.statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function extname(fullpath, options)
{
  if (options?.longest)
  {
    const filename = path.basename(fullpath);
    const index = filename.indexOf('.');
    return index != -1 ? filename.substring(index) : '';
  }

  return path.extname(fullpath);
}

async function fileList(dirname, options)
{
  const list = [];
  if (await directoryExists(dirname)) {
    for (const iter of await fs.promises.readdir(dirname)) {
      const filepath = path.resolve(dirname, iter);
      const stat = await fs.promises.stat(filepath);
      if (stat.isFile()) {
        list.push(options.relative ? path.relative(options.relative, filepath) : filepath);
      }
      else if (options.recursive && stat.isDirectory()) {
        for (const fname of await fileList(filepath, options))
          list.push(fname);
      }
    }
  }
  return list;
}

async function saveIfDifferent(filename, content)
{
  if (await fileExists(filename)) {
    const oldContent = await fs.promises.readFile(filename, { encoding: "utf8" });
    if (content == oldContent)
      return false;
  }

  await fs.promises.mkdir(path.dirname(filename), { recursive: true });
  await fs.promises.writeFile(filename, content, { encoding: "utf8" });
  return true;
}

module.exports = {
  pathExists,
  pathExistsSync,
  fileExists,
  fileExistsSync,
  directoryExists,
  directoryExistsSync,
  extname,
  fileList,
  saveIfDifferent,
};
