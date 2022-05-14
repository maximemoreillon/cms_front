

export default async (context) => {

    console.log("Auth middleware");

    const { 
        store,  
        $axios, 
        $config, 
        app: { $cookies },
    } = context

    const destroy_user = () => {
        $cookies.remove('jwt')
        store.commit('set_current_user', null)
        $axios.setToken(false)
    }

    const jwt = $cookies.get('jwt')

    if(!jwt) return destroy_user()

    $axios.setToken(jwt, 'Bearer')

    const url = `${$config.userManagerApiUrl}/v2/users/self`

    try {
        const { data: user } = await $axios.get(url)
        store.commit('set_current_user', user)
    } 
    catch (error) {
        destroy_user()
    }
    
}
