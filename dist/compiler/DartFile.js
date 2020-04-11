"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// import "@babel/plugin-syntax-jsx";
// import "../transform/index";
const HasChildren_1 = require("./HasChildren");
const Builder = require("./Builder");
const AttributesBuilder_1 = require("./AttributesBuilder");
const path = require("path");
const globalAny = global;
globalAny.Flutter = {
    createElement: (...args) => args,
};
class DartFile {
    constructor(_path, view) {
        this.path = _path;
        this.view = view;
        const viewPath = path.resolve(_path, "../", view);
        delete require.cache[require.resolve(viewPath)];
        const comp = require(viewPath).default;
        let result = walk(comp).replace(/(.*),$/, "$1");
        replaceContent(_path, result);
    }
}
exports.default = DartFile;
function findSpaces(content) {
    let spaces;
    spaces = content.match(/static final spaces\s*=\s*(['"])([^\1]+)\1$/);
    if (spaces)
        spaces = spaces[2];
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
            fs.writeFileSync(_path, newContent);
        }
    }
}
function walk(comp) {
    if (!comp)
        return "";
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
exports.walk = walk;
function renderAttrs(attrs) {
    let _attrs = AttributesBuilder_1.BuildAttributes(attrs, {
        any: "%",
    }, true);
    if (attrs && Object.keys(attrs).length > 1) {
        // _attrs += ",";
    }
    return _attrs;
}
exports.renderAttrs = renderAttrs;
function hasAltBuilder(name) {
    return Builder.hasOwnProperty(name);
}
function altBuild(name, comp) {
    // @ts-ignore
    if (typeof Builder[name] != "function")
        throw Error(`Builder.${name} is not a function`);
    // @ts-ignore
    return Builder[name](comp);
}
function hasChildren(children) {
    return children && Array.isArray(children) && children.length > 0;
}
exports.hasChildren = hasChildren;
function renderChildren(name, children, childKey = "child") {
    let render = [];
    if (children && Array.isArray(children)) {
        render = children.map((_comp) => walk(_comp));
    }
    if (!render)
        return "";
    let newChildren;
    if (HasChildren_1.default.includes(name)) {
        newChildren = `\tchildren: [${render.join(", ")}]`;
    }
    else {
        newChildren = `\t${childKey}: ${render}`;
    }
    return newChildren;
}
exports.renderChildren = renderChildren;
//# sourceMappingURL=DartFile.js.map