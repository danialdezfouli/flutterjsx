import fs, { promises } from "fs";
const path = require("path");

export async function getFiles(dir) {
  let files = await promises.readdir(dir);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await promises.stat(filePath);
      if (stats.isDirectory()) return getFiles(filePath);
      else if (stats.isFile()) return filePath;
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}
