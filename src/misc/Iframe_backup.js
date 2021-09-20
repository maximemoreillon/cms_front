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
          getAttrs: dom => ({
            src: dom.getAttribute("src")
          })
        }
      ],
      toDOM: node => [
        "iframe",
        {
          //src: node.attrs.src,
          src: `https://www.youtube.com/embed/${node.attrs.src}`,
          frameborder: 0,
          allowfullscreen: "true",
          allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          //width: '100%',
          //scrolling: 'yes',
          // You can set the width and height here also
        }
      ]
    };
  }

  /*
  vue.runtime.esm.js?2b0e:1888 TypeError: dom.hasAttribute is not a function
  get view() {
    return {
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          set(src) {
            this.updateAttrs({
              src,
            })
          },
        },
      },
      template: `
        <div class="iframe">
          <iframe class="iframe__embed" :src="src"></iframe>
          <input class="iframe__input" @paste.stop type="text" v-model="src" v-if="view.editable" />
        </div>
      `,
    }
  }
  */

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
