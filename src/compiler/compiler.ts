const fs = require("fs");
import DartFile from "./DartFile";

class Compiler {
  static files: any;

  file: any;
  type: any;
  viewFile: string = "";

  constructor(file: string) {
    this.file = file;
  }

  run() {
    if (this.getViewFile()) {
      let file = new DartFile(this.file, this.viewFile);
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

export default Compiler;
