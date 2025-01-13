import gateway from '@gateway/fileGateway'
import * as CreateTaskModule from './create-task'

export const createTask = CreateTaskModule.createTask.bind(null, { gateway })
