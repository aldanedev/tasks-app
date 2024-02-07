import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL ?? ''
    const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? ''

    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
