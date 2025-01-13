import { TaskData, createTask } from './create-task'
import { mockedGateway } from '../../test-helpers/mockedGateway'

describe('create-task', () => {
    const gateway = { ...mockedGateway, save: jest.fn() }
    const runCreateTask = (task: TaskData) => createTask({ gateway }, task)

    it('saves a new task', async () => {
        await runCreateTask({ title: 'ABC', description: 'abc' })

        expect(gateway.save).toHaveBeenCalledWith({ title: 'ABC', description: 'abc' })
    })
    it('returns the new id for the task', async () => {
        gateway.save.mockResolvedValue('1232')
        const id = await runCreateTask({ title: 'ABC', description: 'abc' })

        expect(id).not.toBeUndefined()
    })
})
