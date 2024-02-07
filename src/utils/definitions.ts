export interface Task {
    id: string
    description: string
    is_done: boolean
    is_repeatable: boolean
}

export interface User {
    id: string
    email: string
}
