import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials"

export default NuxtAuthHandler({
    providers: [
        CredentialsProvider.default({
            async authorize(credentials, req) {

            const res = await fetch("https://api.users.maximemoreillon.com/v2/auth/login", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const {user} = await res.json()
            if (res.ok && user) return user

            // PROBLEM: JWT IS NOT THAT OF AUTH API
            return null
            }
        })
    ]
})