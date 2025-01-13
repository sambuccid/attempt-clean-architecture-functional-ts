import { Task as TaskType } from '@domain/task'
import styles from './Task.module.css'

interface Props {
    task: TaskType
}
export default function Task({ task }: Props) {
    return (
        <div className={styles.task}>
            <p className={styles.title}>{task.title}</p>
            <p className={styles.description}>{task.description}</p>
        </div>
    )
}
