import "@babel/register";
import HasChildren from "./HasChildren";
import * as Builder from './Builder';
import {BuildAttributes} from "./Attributes";

const path = require("path");
global.Flutter = require("../Flutter");


export default class DartFile {
    constructor(_path, view) {
        this.path = _path;
        this.view = view;
        // const viewPath = path.resolve(_path, "../", view);
        // this.content = fs.readFileSync(path.resolve(_path, "../", view), "utf8");

        const viewPath = path.resolve(__dirname + "/../testView.jsx");
        import(viewPath)
            .then(({default: comp}) => {
                console.log(walk(comp));
            })
            .catch((e) => {
                console.log(e);
            });
    }

}


function walk(comp) {
    const [name, attrs, ...children] = comp;
    if (hasAltBuilder(name)) {
        return altBuild(name, comp);
    }

    const builtChildren = renderChildren(name, children)
    const builtAttrs = renderAttrs(attrs);

    return ` 
    ${name}( 
      ${builtChildren}${builtAttrs ? ', \n' + builtAttrs : ''}      
    ),
    `;
    return comp;
}

function renderAttrs(attrs) {
    const _attrs = BuildAttributes(attrs, {
        any: '%'
    });

    return _attrs;
}

function hasAltBuilder(name) {
    return Builder.hasOwnProperty(name)
}

function altBuild(name, comp) {
    if (typeof Builder[name] != 'function')
        throw Error(`Builder.${name} is not a function`);
    return Builder[name](comp);
}

function renderChildren(name, children) {
    let render = [];
    if (Array.isArray(children)) {
        render = children.map((_comp: Array) => walk(_comp));
    }

    let newChildren;
    if (HasChildren.includes(name)) {
        newChildren = `children: [${render.join(', ')}]`;
    } else {
        newChildren = `child: ${render}`;
    }

    return newChildren;
}