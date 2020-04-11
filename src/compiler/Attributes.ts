// @ts-nocheck
import { walk } from "./DartFile";

export const EdgeInsets = (v: any) => {
  if (typeof v == "object") {
    v = Object.entries(v).map(([_k, _v]) => `${_k}:${_v}`);
    return `EdgeInsets.only(${v.join(", ")})`;
  } else if (
    typeof v === "number" ||
    (typeof v === "string" && v.match(/\d+\.\d+/))
  ) {
    return `EdgeInsets.all(${v})`;
  }
  return v;
};

export const padding = EdgeInsets;
export const margin = EdgeInsets;

export function width(value: any) {
  if (value === Infinity) return "double.infinity";
  return value;
}

export const height = width;
export function color(value: any) {
  if (typeof value === "string" && value.match(/#[^\s]{3,9}/)) {
    if (value.length === 4) {
      value = value.replace(
        /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/,
        "#$1$1$2$2$3$3"
      );
    }

    return `Color(${value.replace(/#/, "0xFF")})`;
  }
  return value;
}

export const backgroundColor = color;

export const decoration = (value: any) => {
  if (typeof value === "string") return value;

  return walk(value).replace(/(.*),$/, "$1");
};

export const borderRadius = (value: any) => {
  const c = (v) => `Radius.circular(${v})`;

  if (typeof value == "number")
    return `BorderRadius.all(Radius.circular(${value}))`;

  let v;
  const pattern = /(\d+)\s*(\d+)\s*(\d+)\s*(\d+)/gs;
  if (typeof value == "string") {
    if (value.match(pattern)) {
      v = value.replace(/\s+/g, " ").split(" ");
    } else {
      return value;
    }
  }

  if (Array.isArray(value)) {
    v = value;
  }

  if (!Array.isArray(value) && typeof value == "object") {
    v = value;
  } else {
    v = {
      topLeft: v[0],
      topRight: v[1],
      bottomLeft: v[2],
      bottomRight: v[3],
    };
  }

  const br = Object.entries(v).map(([key, value]) => {
    if (typeof value == "number") value = c(value);
    return `${key}: ${value}`;
  });
  return `BorderRadius.only(${br.join(", ")})`;
};
