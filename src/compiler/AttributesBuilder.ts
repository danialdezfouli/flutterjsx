import * as Attributes from "./Attributes";
// import * as AttributesFilter from "./AttributesFilter";

const fetchValue = (attrs: Array<any>, key: any, replace: any) => {
  let hasNewLine = Object.keys(attrs).length > 1;
  let rawValue = attrs[key];
  let value = rawValue;

  if (typeof value == "undefined") return;

  if (Attributes.hasOwnProperty(key)) {
    // @ts-ignore
    return Attributes[key](value);
  }
  
  if (typeof value == "object")
    value = BuildAttributes(value, false, hasNewLine);

  replace = replace && (replace[key] || replace.any);
  if (replace) {
    value = replace.replace("%", value);
  }
  return value;
};

export const BuildAttributes = (
  attrs: any,
  replace: any = false,
  newLine = false
) => {
  if (attrs) {
    let r = [];
    const keys = Object.keys(attrs);
    for (let key in attrs) {
      const value = fetchValue(attrs, key, replace);
      const isNotLast = keys.indexOf(key) + 1 < keys.length;

      if (typeof value == "undefined") continue;

      if (newLine) {
        r.push(`\t${key}: ${value},${isNotLast ? "\r\n" : ""}`);
      } else {
        r.push(`${key}: ${value}`);
      }
    }

    if (newLine) {
      return r.join("");
    }
    return r.join(", ");
  }
  return "";
};
