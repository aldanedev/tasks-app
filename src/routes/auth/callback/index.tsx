import { type RequestHandler } from '@builder.io/qwik-city'
import { createClient } from '~/utils/supabase/server'

export const onGet: RequestHandler = async (requestEvent) => {
    const { request, redirect } = requestEvent
    const { searchParams, origin } = new URL(request.url)

    const code = searchParams.get('code')

    if (code) {
        const supabase = createClient(requestEvent)
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            throw redirect(302, `${origin}`)
        }
    }
}
