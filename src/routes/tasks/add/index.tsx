import { component$ } from '@builder.io/qwik'
import { Form, routeAction$ } from '@builder.io/qwik-city'
import { type Task } from '~/utils/definitions'
import { createClient } from '~/utils/supabase/server'

export const useAddTask = routeAction$(async (formaData, requestEvent) => {
    const { redirect } = requestEvent
    const task: Task = {
        id: crypto.randomUUID(),
        description: formaData.description as string,
        is_done: false,
    }
    const supabase = createClient(requestEvent)
    await supabase.from('tasks').insert([task])
    throw redirect(302, '/')
})
export default component$(() => {
    const addTaskAction = useAddTask()
    return (
        <div class="max-w-md mx-auto">
            <Form
                action={addTaskAction}
                class="p-5 border-2 rounded-lg shadow-lg flex flex-col flex-grow gap-3"
            >
                <h1 class="text-2xl text-center">Nueva tarea</h1>
                <input
                    type="text"
                    name="description"
                    class="px-3 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    class="border rounded-md py-2 bg-gray-200 border-gray-300"
                >
                    Grabar
                </button>
            </Form>
        </div>
    )
})
