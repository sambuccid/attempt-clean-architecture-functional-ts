import { Task } from '@domain/task'
import { TaskData } from '@use-case/create-task/create-task'

export type Gateway = {
    readAll: () => Promise<Task[]>
    save: (task: TaskData) => Promise<string>
    clean: () => Promise<void>
}
