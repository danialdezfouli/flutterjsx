import * as fs from "fs";
// import "@babel/plugin-syntax-jsx";
// import "../transform/index";

import HasChildren from "./HasChildren";
import * as Builder from "./Builder";
import { BuildAttributes } from "./AttributesBuilder";

const path = require("path");

const globalAny: any = global;
globalAny.Flutter = {
  createElement: (...args: any[]) => args,
};

export default class DartFile {
  path: string;
  view: string;
  constructor(_path: string, view: string) {
    this.path = _path;
    this.view = view;
    const viewPath = path.resolve(_path, "../", view);
    delete require.cache[require.resolve(viewPath)];

    const comp = require(viewPath).default;
    let result = walk(comp).replace(/(.*),$/, "$1");

    replaceContent(_path, result);
  }
}
function findSpaces(content: string) {
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
function replaceContent(_path: string, result: string) {
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
      fs.writeFileSync(_path, newContent);
    }
  }
}

export function walk(comp: Array<any>): string {
  if (!comp) return "";

  if (typeof comp == "string") {
    comp = ["Text", {}, [comp]];
  }

  let [name, attrs, ...children] = comp;

  if (hasAltBuilder(name)) {
    return altBuild(name, comp);
  }

  const builtChildren = hasChildren(children)
    ? renderChildren(name, children)
    : "";
  const builtAttrs = renderAttrs(attrs);

  return `${name}( 
  ${builtChildren}${builtAttrs && builtChildren ? ", \n" : ""}${builtAttrs}
),`;
}

export function renderAttrs(attrs: any) {
  let _attrs = BuildAttributes(
    attrs,
    {
      any: "%",
    },
    true
  );

  if (attrs && Object.keys(attrs).length > 1) {
    // _attrs += ",";
  }

  return _attrs;
}

function hasAltBuilder(name: string) {
  return Builder.hasOwnProperty(name);
}

function altBuild(name: any, comp: any) {
  // @ts-ignore
  if (typeof Builder[name] != "function")
    throw Error(`Builder.${name} is not a function`);
  // @ts-ignore
  return Builder[name](comp);
}

export function hasChildren(children: any) {
  return children && Array.isArray(children) && children.length > 0;
}

export function renderChildren(
  name: string,
  children: Array<any>,
  childKey = "child"
) {
  let render: any = [];

  if (children && Array.isArray(children)) {
    render = children.map((_comp: Array<any>) => walk(_comp));
  }
  if (!render) return "";
  let newChildren;
  if (HasChildren.includes(name)) {
    newChildren = `\tchildren: [${render.join(", ")}]`;
  } else {
    newChildren = `\t${childKey}: ${render}`;
  }

  return newChildren;
}
