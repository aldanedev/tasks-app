import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$, type RequestHandler } from '@builder.io/qwik-city'
import { AuthButton } from '~/components/auth-button'
import { createClient as createServerClient } from '~/utils/supabase/server'

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        public: false,
        maxAge: 0,
        sMaxAge: 0,
        staleWhileRevalidate: 0,
    })
}

export const useUserData = routeLoader$(async (requestEvent) => {
    const supabase = createServerClient(requestEvent)
    const { data } = await supabase.auth.getUser()

    return data.user
})

export const onRequest: RequestHandler = async (requestEvent) => {
    const { next, pathname, redirect } = requestEvent
    const supabase = createServerClient(requestEvent)
    const { error } = await supabase.auth.getUser()
    const excludePaths = ['/auth/callback', '/']
    if (error && !excludePaths.includes(pathname)) {
        throw redirect(302, '/')
    }
    await next()
}

export default component$(() => {
    return (
        <main class="m-auto max-w-screen-lg w-full">
            <header class="flex flex-row-reverse p-4">
                <AuthButton />
            </header>
            <Slot />
        </main>
    )
})
