

export default async (context) => {

    const { store, $axios, $config } = context
    const url = `${$config.apiUrl}/v1/tags/`
    const params = { pinned: true }

    try {
        const { data: tags } = await $axios.get(url, { params })
        store.commit('set_pinned_tags', tags)
    } 
    catch (error) {
        console.error(`Failed to get pinned tags`)
    }

    



}
