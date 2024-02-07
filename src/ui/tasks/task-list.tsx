import { component$, $ } from '@builder.io/qwik'
import { useDeleteTask, useTasksData, useToggleTask } from '~/routes'
import confetti from 'canvas-confetti'
import { TrashIcon } from '~/components/icons/trash-icon'
import { Link } from '@builder.io/qwik-city'

export const TaskList = component$(() => {
    const tasks = useTasksData()
    const toggleTaskAction = useToggleTask()
    const deleteTaskAction = useDeleteTask()
    const handleToggle = $(async (e: Event, element: HTMLInputElement) => {
        await toggleTaskAction.submit({
            id: element.value,
            is_done: element.checked,
        })
        if (element.checked) {
            confetti({ particleCount: 200 })
        }
    })

    const handleDelete = $(async (e: Event, element: HTMLButtonElement) => {
        await deleteTaskAction.submit({
            id: element.value,
        })
    })
    return (
        <ul class="flex flex-col gap-5 p-5 border-2 rounded-md mx-3 shadow-lg">
            <li class="flex justify-center items-center">
                <h1 class="text-3xl text-center flex-grow ">
                    Lista de tareas diarias
                </h1>
                <Link href="/tasks/add" class="text-center text-blue-500" prefetch={false}>
                    Nueva tarea
                </Link>
            </li>
            {tasks.value.map((task) => (
                <li
                    key={task.id}
                    class="flex gap-3 items-center justify-center"
                >
                    <input
                        type="checkbox"
                        name="is_done"
                        checked={task.is_done}
                        value={task.id}
                        onInput$={handleToggle}
                    />
                    <span class="flex-grow">{task.description}</span>
                    <button onClick$={handleDelete} name="id" value={task.id}>
                        <TrashIcon class="w-6 h-6 text-red-500" />
                    </button>
                </li>
            ))}
            <li class={['text-2xl', { hidden: tasks.value.length }]}>
                {tasks.value.length === 0 ? 'No hay tareas' : ''}
            </li>
        </ul>
    )
})
