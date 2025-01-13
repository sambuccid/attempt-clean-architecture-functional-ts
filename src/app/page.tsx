import Link from 'next/link'
import styles from './page.module.css'
import { Add } from '@mui/icons-material'
import { listTasks } from '@use-case/list-tasks'
import Task from './components/Task/Task'

export default async function Home() {
    const tasks = await listTasks()

    return (
        <main className={styles.main}>
            <div className={styles.add}>
                <Link href="/new">
                    <Add fontSize="large" />
                </Link>
            </div>
            <div className={styles.allTasks}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </main>
    )
}
