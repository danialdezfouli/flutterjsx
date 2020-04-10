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
