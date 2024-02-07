import { $, component$ } from '@builder.io/qwik'
import { useNavigate, useLocation } from '@builder.io/qwik-city'
import { useUserData } from '~/routes/layout'
import { createClient } from '~/utils/supabase/client'
import { GitHubIcon } from './icons/github-icon'
import { LogOutIcon } from './icons/logout-icon'

export const AuthButton = component$(() => {
    const user = useUserData()
    const nav = useNavigate()
    const location = useLocation()
    const handleSignIn = $(async () => {
        const { origin } = new URL(location.url)
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        })
        if (error) {
            console.error('Error signing in:', error)
        }
    })
    const handleSignOut = $(async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        const { pathname } = new URL(location.url)
        if (pathname !== '/') {
            nav('/')
        } else {
            nav()
        }
    })

    if (user.value) {
        return (
            <button
                class="flex items-center border-2 px-3 py-2 rounded-md"
                onClick$={handleSignOut}
            >
                <LogOutIcon class="w-5 h-5 mr-3" />
                <span>Cerrar Sesion</span>
            </button>
        )
    }
    return (
        <button
            class="flex rounded-md border-2 px-3 py-2 items-center"
            onClick$={handleSignIn}
        >
            <GitHubIcon class="w-5 h-5 mr-3" /> <span>Iniciar Sesion</span>
        </button>
    )
})
