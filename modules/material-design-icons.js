import { resolve } from 'path'

const icons = [
  'Account',
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
