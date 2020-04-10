const fs = require("fs");
import DartFile from "./DartFile";

const JS = "js";
const DART = "dart";

export default class Compiler {
    file = '';
    type = '';
    constructor(file) {
        this.file = file;
        if (file.match(/\.jsx?$/)) this.type = JS;
        else this.type = DART;
    }

    run() {
        const {type, file: filePath} = this;
        if (type === DART) {
            let viewFile = this.dartFileHasView(filePath);
            if (viewFile) {
                let file = new DartFile(filePath, viewFile[1]);
                // console.table(file);
                // console.log(file.content);
            }
        }

    }

    dartFileHasView(file) {
        const content = fs.readFileSync(file, "utf8");
        const pattern = /^(?!\s*\/\/)\s*static final jsxView\s*=\s*([^;]+)/im;
        const mached = content.match(pattern);
        if (mached) {
            mached[1] = mached[1].replace(/(['"])(.+)\1/, "$2");
        }
        return mached;
    }
}
