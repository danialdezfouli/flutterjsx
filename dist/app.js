"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@babel/register")({
    presets: [require("@babel/preset-env").default],
    plugins: [
        require("@babel/plugin-syntax-jsx").default,
        require("./transform").default,
    ],
});
const fs = require("fs");
const utils_1 = require("./kernel/utils");
const compiler_1 = require("./compiler/compiler");
const chokidar = require("chokidar");
const path = require("path");
process.stdin.resume();
process.stdin.setEncoding("utf8");
let watcher;
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
    watcher.on("change", (path, stats) => {
        if (stats && compiler_1.default.files[path]) {
            compiler_1.default.files[path].run();
            console.log(`File ${path} changed`);
        }
    });
    if (fs.existsSync("lib")) {
        compiler_1.default.files = Object.create(null);
        utils_1.getFiles("lib").then((files) => {
            for (const file of files) {
                // @ts-ignore
                if (file.match(/\.dart?$/)) {
                    const compiler = new compiler_1.default(file);
                    if (compiler.getViewFile()) {
                        if (compiler.viewFile) {
                            compiler_1.default.files[path.join(file, "../", compiler.viewFile)] = compiler;
                        }
                        compiler.run();
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=app.js.map