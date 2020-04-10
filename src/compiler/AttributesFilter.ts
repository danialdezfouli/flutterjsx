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
