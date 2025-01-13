import { Task } from '@domain/task'
import { TaskData, createTask } from '@use-case/create-task/create-task'
import { listTasks } from '@use-case/list-tasks/list-tasks'

const memoryGateway = {
    newId: function () {
        return this.data.tasks.length.toString()
    },
    data: { tasks: [] as Task[] },
    readAll: async function () {
        return this.data.tasks
    },
    save: async function (task: TaskData) {
        const id = this.newId()
        this.data.tasks.push({ ...task, id })
        return id
    },
    clean: async function () {
        this.data.tasks = []
    },
}

test('saving a task will be returned in the list of tasks', async () => {
    const deps = { gateway: memoryGateway }
    await createTask(deps, { title: 'A new task', description: 'A new task for testing' })

    const retrievedTasks = await listTasks(deps)
    expect(retrievedTasks).toEqual([
        expect.objectContaining({ title: 'A new task', description: 'A new task for testing' }),
    ])
})

test('creates a new id for each new task created', async () => {
    const deps = { gateway: memoryGateway }
    const id = await createTask(deps, {
        title: 'A new task',
        description: 'A new task for testing',
    })

    const retrievedTasks = await listTasks(deps)
    expect(retrievedTasks).toContainEqual(expect.objectContaining({ id }))
})
