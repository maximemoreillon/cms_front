import { Node } from 'tiptap'

export default class Iframe extends Node {
  get name() {
    return 'iframe'
  }

  get schema() {
    return {
      attrs: {
        // These have defaults. Here's the attribute spec:
        // https://prosemirror.net/docs/ref/#model.AttributeSpec
        frameborder: {
          default: 0
        },
        allowfullscreen: {
          default: 'true'
        },
        allow: {
          default: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        },
        width: {
          default: '560'
        },
        height: {
          default: '315'
        },
        src: {
          default: 'https://youtube.com/embed/IHv0nVxnycw'
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [
        {
          tag: 'iframe[src]',
          getAttrs: dom => ({
            src: dom.getAttribute('src')
          })
        }
      ],
      toDOM: node => ['iframe', node.attrs],
    }
  }

  get view() {
    // This is rendered as a Vue component and so it has
    // the same interface as a renderless component.
    return {
      // Give it a name to work with Vue dev tools
      name: 'YoutubeEmbed',
      // Accept these props from... something? tiptap?
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          // Can't mutate src directly so tiptap
          // provides the updateAttrs function
          set(src) {
            this.updateAttrs({
              src,
            })
          },
        },
      },
      // Render Function
      // Because the version of vue doesn't ship with
      // the template compiler
      render: function(createElement) {
        // If the view is editable show an input field
        if (this.view.editable) {
          // console.log(this.view)
          // console.log(this.node)
          // console.log(`Computed src: ${this.src}`)
          // Wrap it all in a div
          return createElement('div', {
              class: 'text-center'
            },
            [
            // https://vuejs.org/v2/guide/render-function.html#Complete-Example
            createElement('iframe', {
              class: 'mx-auto',
              attrs: {
                ...this.node.attrs
              }
            }),
            createElement('label', {
              class: 'block'
              },
              [
                'Video Embed URL',
                createElement('input', {
                  class: 'ml-2 w-auto',
                  domProps: {
                    value: this.src
                  },
                  on: {
                    input: event => {
                      this.src = event.target.value
                      // console.log(event.target.value)
                    },
                    paste: event => {
                      event.stopPropagation()
                      this.src = event.target.value
                    }
                  }
                })
              ])
          ])
        } else {
          // Wrap it all in a div
          return createElement('div', [
            // https://vuejs.org/v2/guide/render-function.html#Complete-Example
            createElement('iframe', {
              attrs: {
                ...this.node.attrs
              }
            }),
          ])
        }
      }
    }
  }

  // type in the commands function is destructured from
  //
  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}
