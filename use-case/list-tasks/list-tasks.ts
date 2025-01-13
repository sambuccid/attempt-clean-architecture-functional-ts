import { Task } from '@domain/task'
import { Gateway } from '@use-case/gateway'

interface Deps {
    gateway: Gateway
}
export async function listTasks({ gateway }: Deps): Promise<Task[]> {
    return gateway.readAll()
}
