console.clear();
import { getFiles } from "./kernel/utils";
import Compiler from "./compiler/compiler";

getFiles("dart").then((files) => {
  for (const file of files) {
    const compiler = new Compiler(file);
    compiler.run();
  }
});

