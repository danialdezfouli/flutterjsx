const fetchValue = (attrs, key, replace) => {
    let value = attrs[key]

    if (typeof value == "undefined")
        return;

    if (typeof value === 'string' && value.match(/#\d{6}/)) {
        return value.replace(/#/, '0xFF');
    }

    if (typeof value == 'object')
        value = BuildAttributes(value);

    replace = replace && (replace[key] || replace.any);
    if (replace) {
        value = replace.replace('%', value)
    }
    return value;
}
export const BuildAttributes = (attrs, replace) => {
    if (attrs) {
        let r = [];
        for (let key in attrs) {
            const value = fetchValue(attrs, key, replace)
            if (typeof value == "undefined")
                continue;

            r.push(`${key}: ${value}`)
        }
        // console.log(attrs);

        return r.join(', ')
    }
}