import { Node } from "tiptap";

export default class Iframe extends Node {
    get name() {
        return "iframe";
    }

    get schema() {
        return {
            attrs: {
                src: {
                    default: null
                }
            },
            group: "block",
            selectable: false,
            parseDOM: [
                {
                    tag: "iframe",
                    getAttrs: dom => {
                        const original_src = dom.getAttribute("src")
                        const original_src_split = original_src.split('embed/')
                        const src = original_src_split[original_src_split.length - 1]
                        return { src }
                    }
                }
            ],
            toDOM: node => [
                "iframe",
                {
                    src: `https://www.youtube.com/embed/${node.attrs.src}`,
                    frameborder: 0,
                    allowfullscreen: "true",
                    allow:
                        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    // You can set the width and height here also
                }
            ]
        };
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state;
            const position = selection.$cursor
                ? selection.$cursor.pos
                : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
        };
    }
}
