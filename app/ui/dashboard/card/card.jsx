import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css"

const Card = () => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={25}/>
            <div className={styles.text}>
                <span className={styles.title}> Total Users</span>
                <span className={styles.number}> 5.200</span>
                <span className={styles.detail}>
                    <span className={styles.possitive}>25%</span> lebih dari sebelumnya
                </span>
            </div> 
        </div>
    )
}

export default Card;