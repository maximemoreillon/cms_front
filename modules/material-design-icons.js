import { resolve } from 'path'

const icons = [
  'Alphabetical',
  'Account',
  'Calendar',
  'CalendarEdit',
  'Close',
  'ContentSave',
  'Eye',
  'FileDocumentOutline',
  'Earth',
  'Image',
  'InformationOutline',
  'Lock',
  'Magnify',
  'Menu',
  'NewspaperVariantMultipleOutline',
  'Login',
  'Logout',
  'Pencil',
  'Plus',
  'SortAscending',
  'SortDescending',
  'Tag',
  'TagOff',
  'TagMultiple',
  // Editor toolbar
  'CodeBracesBox',
  'CodeBraces',
  'FormatListNumbered',
  'FormatListBulleted',
  'FormatHeader1',
  'FormatHeader2',
  'FormatHeader3',
  'FormatParagraph',
  'FormatUnderline',
  'FormatStrikethrough',
  'FormatBold',
  'FormatItalic',
  'Link',
  
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
