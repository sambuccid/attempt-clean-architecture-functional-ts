import fileGateway from './fileGateway'

describe('gateway', () => {
    // This test file is generic enough to be applicable to any gateway implementation, we can add them in this array and they will be automatically tested
    const gateways = [fileGateway]

    beforeEach(async () => {
        await Promise.all(gateways.map((g) => g.clean()))
    })
    afterEach(async () => {
        await Promise.all(gateways.map((g) => g.clean()))
    })

    it.each(gateways)('stores new task', async (gateway) => {
        await gateway.save({ title: 'test task', description: 'test' })
    })
    it.each(gateways)('generates new id when storing task', async (gateway) => {
        const generatedId = await gateway.save({ title: 'test task', description: 'test' })

        const tasks = await gateway.readAll()
        expect(tasks[0].id).not.toBeUndefined()
        expect(tasks[0].id).toBe(generatedId)
    })
    it.each(gateways)('stores new task when previous task exists', async (gateway) => {
        await gateway.save({ title: 'test task', description: 'test' })
        await gateway.save({ title: 'test task 2', description: 'test' })
    })

    it.each(gateways)('retrieves list of tasks', async (gateway) => {
        await gateway.save({ title: 'test task 1', description: 'test1' })
        await gateway.save({ title: 'test task 2', description: 'test2' })

        const tasks = await gateway.readAll()
        expect(tasks.length).toBe(2)
        expect(tasks).toContainEqual(
            expect.objectContaining({ title: 'test task 1', description: 'test1' }),
        )
        expect(tasks).toContainEqual(
            expect.objectContaining({ title: 'test task 2', description: 'test2' }),
        )
    })
})
