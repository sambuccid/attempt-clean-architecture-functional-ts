import { Task } from '@domain/task'
import { Gateway } from '@use-case/gateway'

export type TaskData = Omit<Task, 'id'>

interface Deps {
    gateway: Gateway
}
export async function createTask({ gateway }: Deps, task: TaskData) {
    // All validations would be here
    return await gateway.save(task)
}
