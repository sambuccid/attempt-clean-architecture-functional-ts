import { Add } from '@mui/icons-material'
import LabelledInput from '../components/LabelledInput/LabelledInput'
import styles from './page.module.css'
import { createTask } from '@use-case/create-task'
import { redirect } from 'next/navigation'

export default function Page() {
    async function create(formData: FormData) {
        'use server'

        await createTask({
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        })
        redirect('/')
    }

    return (
        <main className={styles.main}>
            <form className={styles.newForm} action={create}>
                <LabelledInput name="title" />
                <LabelledInput name="description" />

                <div className={styles.addButton}>
                    <button type="submit">
                        <Add fontSize="large" />
                    </button>
                </div>
            </form>
        </main>
    )
}
