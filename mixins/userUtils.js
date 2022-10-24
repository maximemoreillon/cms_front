export default {

    computed: {
        user_is_admin() {
            const { user } = this.$auth
            if (!user) return false
            return user.isAdmin
        },
    }
}
