import {BuildAttributes} from "./AttributesBuilder";

export const Text = ([, attrs, text]) => {
    if (attrs && attrs.text && !text) {
        text = `"${attrs.text}"`;
        attrs.text = undefined;
    }

    const _attrs = BuildAttributes(attrs, {
        style: 'TextStyle(%)'
    });

    return `Text(${text}${_attrs ? ', ' + _attrs : ''})`;
}