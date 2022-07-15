import { resolve } from 'path'

const icons = [
  'Alphabetical',
  'Account',
  'ArrowLeft',
  'Calendar',
  'CalendarEdit',
  'Close',
  'ContentSave',
  'CodeBraces',
  'CodeBracesBox',
  'Delete',
  'Eye',
  'Earth',
  'FileDocumentOutline',
  'FormatListNumbered',
  'FormatListBulleted',
  'FormatHeader1',
  'FormatHeader2',
  'FormatHeader3',
  'FormatParagraph',
  'FormatUnderline',
  'FormatStrikethrough',
  'FormatAlignLeft',
  'FormatAlignCenter',
  'FormatAlignRight',
  'FormatBold',
  'FormatItalic',
  'Image',
  'InformationOutline',
  'Lock',
  'Login',
  'Logout',
  'Link',
  'Magnify',
  'Menu',
  'NewspaperVariantMultipleOutline',
  'Pencil',
  'Pin',
  'Plus',
  'SortAscending',
  'SortDescending',
  'Tag',
  'TagOff',
  'TagMultiple',
  'Youtube',
  
]

export default function () {
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: resolve('node_modules/vue-material-design-icons'),
      prefix: 'MaterialIcon',
      pattern: `**/@(${icons.join('|')}).vue`,
    })
  })
}
