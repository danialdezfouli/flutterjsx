"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attributes = require("./Attributes");
const AttributesFilter = require("./AttributesFilter");
const fetchValue = (attrs, key, replace) => {
    let hasNewLine = Object.keys(attrs).length > 1;
    let rawValue = attrs[key];
    let value = rawValue;
    if (typeof value == "undefined")
        return;
    for (let filter of Object.values(AttributesFilter)) {
        value = filter(value);
    }
    if (Attributes.hasOwnProperty(key)) {
        // @ts-ignore
        value = Attributes[key](value);
    }
    if (typeof value == "object")
        value = exports.BuildAttributes(value, false, hasNewLine);
    replace = replace && (replace[key] || replace.any);
    if (replace) {
        value = replace.replace("%", value);
    }
    return value;
};
exports.BuildAttributes = (attrs, replace = false, newLine = false) => {
    if (attrs) {
        let r = [];
        const keys = Object.keys(attrs);
        for (let key in attrs) {
            const value = fetchValue(attrs, key, replace);
            const isNotLast = keys.indexOf(key) + 1 < keys.length;
            if (typeof value == "undefined")
                continue;
            if (newLine) {
                r.push(`\t${key}: ${value},${isNotLast ? "\r\n" : ""}`);
            }
            else {
                r.push(`${key}: ${value}`);
            }
        }
        if (newLine) {
            return r.join("");
        }
        return r.join(", ");
    }
};
//# sourceMappingURL=AttributesBuilder.js.map