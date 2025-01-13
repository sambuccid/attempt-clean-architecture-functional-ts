import { Gateway } from '@use-case/gateway'
import { promises as fs } from 'fs'
import path from 'path'
import { TaskData } from '@use-case/create-task/create-task'
import { Task } from '@domain/task'

const FILES_PATH =
    '/Users/david.sambucci/Documents/projects/exercices/clean-arch-functional-ts/data'
const TASK_DATA_FILE = 'task.json'
const LIST_DATA_FILES = [TASK_DATA_FILE]

async function save(task: TaskData) {
    const generatedId = newId()
    // TODO check if id is already used

    const taskToPersist = {
        ...task,
        id: generatedId,
    }

    await init()
    const tasks = await readAll()
    tasks.push(taskToPersist)
    await saveFile(TASK_DATA_FILE, tasks)
    return generatedId
}

async function readAll(): Promise<Task[]> {
    await init()
    return readFile(TASK_DATA_FILE)
}

async function clean() {
    await fs.rm(FILES_PATH, { recursive: true, force: true })
}

async function readFile(fileName: string) {
    const filePath = getFullPath(fileName)
    const file = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(file)
}

async function saveFile(fileName: string, data: unknown) {
    const filePath = getFullPath(fileName)
    await fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf-8' })
}

async function init() {
    try {
        await fs.access(FILES_PATH)
    } catch (_e) {
        await fs.mkdir(FILES_PATH, { recursive: true })
    }

    const initialData = '[]'
    for (const dataFile of LIST_DATA_FILES) {
        try {
            await fs.writeFile(getFullPath(dataFile), initialData, { flag: 'wx' })
        } catch (_e) {}
    }
}

function getFullPath(dataFilePath: string) {
    return path.join(FILES_PATH, dataFilePath)
}

function newId() {
    return Math.floor(Math.random() * 1000000).toString()
}

const gateway: Gateway = {
    save,
    readAll,
    clean,
}
export default gateway
