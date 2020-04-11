import { BuildAttributes } from "./AttributesBuilder";
import { hasChildren, renderAttrs, renderChildren } from "./DartFile";

export const Text = ([, attrs, text]: any) => {
  if (attrs && attrs.text && !text) {
    text = `"${attrs.text}"`;
    attrs.text = undefined;
  }

  const _attrs = BuildAttributes(attrs, {
    style: "TextStyle(%)",
  });

  return `Text(${text}${_attrs ? ", " + _attrs : ""})`;
};

export const Scaffold = ([name, attrs, ...body]: any) => {
  const builtChildren = hasChildren(body)
    ? renderChildren(name, body, "body")
    : "";
  const builtAttrs = renderAttrs(attrs);

  return `Scaffold(
    ${builtAttrs}${builtChildren}
  )`;
};
