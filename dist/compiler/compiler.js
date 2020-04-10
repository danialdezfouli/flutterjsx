"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const DartFile_1 = require("./DartFile");
class Compiler {
    constructor(file) {
        this.viewFile = "";
        this.file = file;
    }
    run() {
        if (this.getViewFile()) {
            let file = new DartFile_1.default(this.file, this.viewFile);
        }
    }
    getViewFile() {
        const content = fs.readFileSync(this.file, "utf8");
        const pattern = /^(?!\s*\/\/)\s*static final jsxView\s*=\s*([^;]+)/im;
        const matched = content.match(pattern);
        if (matched) {
            matched[1] = matched[1].replace(/(['"])(.+)\1/, "$2");
        }
        this.viewFile = matched && matched[1];
        return !!matched;
    }
}
exports.default = Compiler;
//# sourceMappingURL=compiler.js.map