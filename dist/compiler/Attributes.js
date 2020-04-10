"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeInsets = (v) => {
    if (typeof v == "object") {
        v = Object.entries(v).map(([_k, _v]) => `${_k}:${_v}`);
        return `EdgeInsets.only(${v.join(", ")})`;
    }
    else if (typeof v === "number" ||
        (typeof v === "string" && v.match(/\d+\.\d+/))) {
        return `EdgeInsets.all(${v})`;
    }
    return v;
};
exports.padding = exports.EdgeInsets;
exports.margin = exports.EdgeInsets;
//# sourceMappingURL=Attributes.js.map