import type {
    RequestEvent,
    RequestEventAction,
    RequestEventLoader,
} from '@builder.io/qwik-city'
import { createServerClient } from '@supabase/ssr'

export function createClient({
    env,
    cookie,
}: RequestEvent | RequestEventLoader | RequestEventAction) {
    const SUPABASE_URL = env.get('PUBLIC_SUPABASE_URL') ?? ''
    const SUPABASE_ANON_KEY = env.get('PUBLIC_SUPABASE_ANON_KEY') ?? ''
    return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            get(name) {
                return cookie.get(name)?.value
            },
            set(name, value, options) {
                cookie.set(name, value, options)
            },
            remove(name, options) {
                cookie.delete(name, options)
            },
        },
    })
}
