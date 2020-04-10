import "@babel/register";
import HasChildren from "./HasChildren";
import * as Builder from "./Builder";
import { BuildAttributes } from "./AttributesBuilder";
import fs from "fs";

const path = require("path");
global.Flutter = require("../Flutter");

export default class DartFile {
  path;
  view;
  constructor(_path, view) {
    this.path = _path;
    this.view = view;
    const viewPath = path.resolve(_path, "../", view);
    import(viewPath)
      .then(({ default: comp }) => {
        let result = walk(comp).replace(/(.*),$/, "$1");
        replaceContent(_path, result);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
function findSpaces(content) {
  let spaces;
  spaces = content.match(/static final spaces\s*=\s*(['"])([^\1]+)\1$/);
  if (spaces) spaces = spaces[2];
  else {
    spaces = content.match(/(?=\n*) +(?=build\(BuildContext context)/);
    if (spaces) {
      spaces = spaces[0];
    }
  }

  return spaces;
}
function replaceContent(_path, result) {
  const content = fs.readFileSync(_path, "utf8");
  const spaces = findSpaces(content);
  const pattern = /build\([^)]+\).*\/\/\s?afterBuild/gis;

  const _buildMethod = `build(BuildContext context) {
${spaces}return ${result}; 
${spaces}}
${spaces}// afterBuild`;
  if (content.match(pattern)) {
    const newContent = content.replace(pattern, _buildMethod);
    if (newContent !== content) {
      console.log(Date.now());
      fs.writeFileSync(_path, newContent);
    }
  }
}

function walk(comp) {
  const [name, attrs, ...children] = comp;
  if (hasAltBuilder(name)) {
    return altBuild(name, comp);
  }

  const builtChildren = renderChildren(name, children);
  const builtAttrs = renderAttrs(attrs);

  return `${name}( 
  ${builtChildren}${builtAttrs ? ", \n" + builtAttrs : ""}      
),`;
}

function renderAttrs(attrs) {
  let _attrs = BuildAttributes(
    attrs,
    {
      any: "%",
    },
    true
  );

  if (Object.keys(attrs).length > 1) {
    // _attrs += ",";
  }

  return _attrs;
}

function hasAltBuilder(name) {
  return Builder.hasOwnProperty(name);
}

function altBuild(name, comp) {
  if (typeof Builder[name] != "function")
    throw Error(`Builder.${name} is not a function`);
  return Builder[name](comp);
}

function renderChildren(name, children) {
  let render = [];
  if (Array.isArray(children)) {
    render = children.map((_comp: Array<any>) => walk(_comp));
  }

  let newChildren;
  if (HasChildren.includes(name)) {
    newChildren = `\tchildren: [${render.join(", ")}]`;
  } else {
    newChildren = `\tchild: ${render}`;
  }

  return newChildren;
}
