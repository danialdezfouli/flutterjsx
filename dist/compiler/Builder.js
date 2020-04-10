"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AttributesBuilder_1 = require("./AttributesBuilder");
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
//# sourceMappingURL=Builder.js.map