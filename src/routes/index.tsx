import { component$ } from '@builder.io/qwik'
import {
    routeLoader$,
    type DocumentHead,
    routeAction$,
} from '@builder.io/qwik-city'
import type { Task } from '~/utils/definitions'
import { createClient } from '~/utils/supabase/server'
import { useUserData } from './layout'
import { TaskList } from '~/ui/tasks/task-list'

export const useTasksData = routeLoader$(async (requestEvent) => {
    const supabase = createClient(requestEvent)
    const { data } = await supabase
        .from('tasks')
        .select()
        .order('id', { ascending: false })

    return data as Task[]
})


export const useToggleTask = routeAction$(async (formaData, requestEvent) => {
    const supabase = createClient(requestEvent)
    await supabase
        .from('tasks')
        .update({ is_done: formaData.is_done })
        .eq('id', formaData.id)
})

export const useDeleteTask = routeAction$(async (formaData, requestEvent) => {
    const supabase = createClient(requestEvent)
    await supabase.from('tasks').delete().eq('id', formaData.id)
})

export default component$(() => {
    const user = useUserData()
   

    if (!user.value) {
        return (
            <div class="grid place-content-center h-screen">
                <h1 class="text-6xl">Aplicacion de tareas</h1>
            </div>
        )
    }
    return (
        <>
            
            <TaskList />
        </>
    )
})

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
}
