"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AttributesBuilder_1 = require("./AttributesBuilder");
const DartFile_1 = require("./DartFile");
exports.Text = ([, attrs, text]) => {
    if (attrs && attrs.text && !text) {
        text = `"${attrs.text}"`;
        attrs.text = undefined;
    }
    const _attrs = AttributesBuilder_1.BuildAttributes(attrs, {
        style: "TextStyle(%)",
    });
    return `Text(${text}${_attrs ? ", " + _attrs : ""})`;
};
exports.Scaffold = ([name, attrs, ...body]) => {
    const builtChildren = DartFile_1.hasChildren(body)
        ? DartFile_1.renderChildren(name, body, "body")
        : "";
    const builtAttrs = DartFile_1.renderAttrs(attrs);
    return `Scaffold(
    ${builtAttrs}${builtChildren}
  )`;
};
//# sourceMappingURL=Builder.js.map