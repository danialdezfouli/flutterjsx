require("@babel/register")({
  presets: [require("@babel/preset-env").default],
  plugins: [
    require("@babel/plugin-syntax-jsx").default,
    require("./transform").default,
  ],
});

import * as fs from "fs";
import { getFiles } from "./kernel/utils";
import Compiler from "./compiler/compiler";
import * as chokidar from "chokidar";
import * as path from "path";

process.stdin.resume();
process.stdin.setEncoding("utf8");

let watcher: any;
process.stdin.on("data", (data) => {
  // const str = data.toString().trim().toLowerCase();
  if (watcher) {
    watcher.close().then(serve);
  }
});

serve();

function serve() {
  console.clear();
  const date = new Date().toString().substr(0, 24).replace("T", " ");
  console.log(`> FlutterJsx is waiting for jsx files changes. [${date}]
  press \`enter\` to restart.`);

  watcher = chokidar.watch("lib", {
    ignored: /.*\.dart$/,
    persistent: true,
  });

  watcher.on("change", (path: string, stats: any) => {
    if (stats && Compiler.files[path]) {
      Compiler.files[path].run();
      console.log(`File ${path} changed`);
    }
  });

  if (fs.existsSync("lib")) {
    Compiler.files = Object.create(null);

    getFiles("lib").then((files) => {
      for (const file of files) {
        // @ts-ignore
        if (file.match(/\.dart?$/)) {
          const compiler = new Compiler(file);
          if (compiler.getViewFile()) {
            if (compiler.viewFile) {
              Compiler.files[
                path.join(file, "../", compiler.viewFile)
              ] = compiler;
            }
            compiler.run();
          }
        }
      }
    });
  }
}
