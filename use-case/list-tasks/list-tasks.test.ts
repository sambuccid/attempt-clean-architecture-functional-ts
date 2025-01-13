import { mockedGateway } from '../../test-helpers/mockedGateway'
import { listTasks } from './list-tasks'

describe('list-tasks', () => {
    const gateway = { ...mockedGateway, readAll: jest.fn() }
    const runListTask = () => listTasks({ gateway })

    it('returns and empty list when no tasks exist', async () => {
        gateway.readAll.mockResolvedValue([])

        const tasks = await runListTask()
        expect(tasks).toEqual([])
    })
    it('return 1 task with it exists in the database', async () => {
        gateway.readAll.mockResolvedValue([{}])

        const tasks = await runListTask()
        expect(tasks.length).toEqual(1)
    })
})
