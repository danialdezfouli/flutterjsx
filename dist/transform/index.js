"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const plugin_syntax_jsx_1 = require("@babel/plugin-syntax-jsx");
const helper_builder_react_jsx_1 = require("@babel/helper-builder-react-jsx");
const core_1 = require("@babel/core");
const DEFAULT = {
    pragma: "Flutter.createElement",
    pragmaFrag: "Flutter.createElement",
};
exports.default = helper_plugin_utils_1.declare(function (api, options) {
    const PRAGMA_DEFAULT = options.pragma || DEFAULT.pragma;
    const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || DEFAULT.pragmaFrag;
    const PURE_ANNOTATION = options.pure;
    const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
    const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;
    // returns a closure that returns an identifier or memberExpression node
    // based on the given id
    const createIdentifierParser = (id) => () => {
        return id
            .split(".")
            .map((name) => core_1.types.identifier(name))
            .reduce((object, property) => core_1.types.memberExpression(object, property));
    };
    const visitor = helper_builder_react_jsx_1.default({
        pre(state) {
            const tagName = state.tagName;
            const args = state.args;
            args.push(core_1.types.stringLiteral(tagName));
        },
        post(state, pass) {
            // console.log(pass.get("jsxIdentifier")());
            // state.callee = (...args) => {
            //     console.log(args);
            // };
            state.callee = pass.get("jsxIdentifier")();
            state.pure = PURE_ANNOTATION !== null && PURE_ANNOTATION !== void 0 ? PURE_ANNOTATION : pass.get("pragma") === DEFAULT.pragma;
        },
        compat: true,
    });
    visitor.Program = {
        enter(path, state) {
            const { file } = state;
            let pragma = PRAGMA_DEFAULT;
            let pragmaFrag = PRAGMA_FRAG_DEFAULT;
            let pragmaSet = !!options.pragma;
            let pragmaFragSet = !!options.pragma;
            if (file.ast.comments) {
                for (const comment of file.ast.comments) {
                    const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);
                    if (jsxMatches) {
                        pragma = jsxMatches[1];
                        pragmaSet = true;
                    }
                    const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(comment.value);
                    if (jsxFragMatches) {
                        pragmaFrag = jsxFragMatches[1];
                        pragmaFragSet = true;
                    }
                }
            }
            state.set("jsxIdentifier", createIdentifierParser(pragma));
            state.set("jsxFragIdentifier", createIdentifierParser(pragmaFrag));
            state.set("usedFragment", false);
            state.set("pragma", pragma);
            state.set("pragmaSet", pragmaSet);
            state.set("pragmaFragSet", pragmaFragSet);
        },
        exit(path, state) {
            if (state.get("pragmaSet") &&
                state.get("usedFragment") &&
                !state.get("pragmaFragSet")) {
                throw new Error("transform-react-jsx: pragma has been set but " +
                    "pragmaFrag has not been set");
            }
        },
    };
    // visitor.JSXAttribute = function (path) {
    //     if (t.isJSXElement(path.node.value)) {
    //         path.node.value = t.jsxExpressionContainer(path.node.value);
    //     }
    // };
    return {
        name: "custom-transform",
        inherits: plugin_syntax_jsx_1.default,
        visitor,
    };
});
//# sourceMappingURL=index.js.map