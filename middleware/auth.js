

export default async (context) => {

    const { store, app, $axios, $config } = context

    const destroy_user = () => {
        app.$cookies.remove('jwt')
        store.commit('set_current_user', null)
        delete $axios.defaults.headers.common.Authorization
    }

    const jwt = app.$cookies.get('jwt')

    if(!jwt) return destroy_user()

    $axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

    const url = `${$config.userManagerApiUrl}/v2/users/self`

    try {
        const { data: user } = await $axios.get(url)
        store.commit('set_current_user', user)
    } 
    catch (error) {
        destroy_user()
    }
    
}
