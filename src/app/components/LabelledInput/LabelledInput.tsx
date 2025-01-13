import styles from "./LabelledInput.module.css";

interface Props {
    name: string
}
export default function LabelledInput({name}: Props){
    const labelText = name[0].toUpperCase() + name.slice(1)
    
    return <div className={styles.labelledInput}>
        <label htmlFor={name}> {labelText}: </label>
        <input name={name} id={name} />
    </div>
}