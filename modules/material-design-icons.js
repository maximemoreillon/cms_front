import { resolve } from 'path'

const icons = [
  'Account',
  'Close',
  'Menu',
  'Lock',
  'Pencil',
  'Tag',
  'TagOff',
  'TagMultiple',
  'InformationOutline',
  'Calendar',
  'CalendarEdit',
  'Alphabetical',
  'Eye',
  'SortAscending',
  'SortDescending',
  'Magnify',
  'FileDocumentOutline',
  'Earth',
  'NewspaperVariantMultipleOutline',
  'Login',
  'Logout',
  'Plus',
  'Image',
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
