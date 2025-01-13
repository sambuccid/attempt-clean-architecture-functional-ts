import gateway from '@gateway/fileGateway'
import * as ListTasksModule from './list-tasks'

export const listTasks = ListTasksModule.listTasks.bind(null, { gateway })
