export default {
    head() {

        const title = this.article?.title || 'Articles | Maxime Moreillon'
        const summary = this.article?.summary || 'An article management system'
        const imageUrl = 'https://articles.maximemoreillon.com/logo.png'
        const imageAlt = 'Maxime Moreillon logo'

        return {
            title,

            meta: [
                { hid: 'description', name: 'description', content: summary },

                // Twitter
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:site', name: 'twitter:site', content: '@m_moreillon' },
                { hid: 'twitter:title', name: 'twitter:title', content: title },
                { hid: 'twitter:description', name: 'twitter:description', content: summary },
                { hid: 'twitter:image', name: 'twitter:image', content: imageUrl },
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: imageAlt },

                // OpenGraph
                { hid: 'og:title', name: 'og:title', content: title },
                { hid: 'og:description', name: 'og:description', content: summary },
                { hid: 'og:image', name: 'og:image', content: imageUrl },
                { hid: 'og:url', name: 'og:url', content: imageAlt },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:locale', name: 'og:locale', content: 'en_US' },

            ]

        }
    },
}
