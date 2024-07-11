import Image from "next/image";
import styles from "./rightbar.module.css"
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgcontainer}>
                <Image src="/astronaut.png" alt="" fill className={styles.image}/>
                </div>
                <div>
                <span className={styles.notification}>
                  🔥 available Now
                </span>
                <h3 className={styles.title}>
                  How to use the new version of the admin dahsboard
                </h3>
                <span className={styles.subtitle}>
                  Takes 4 minuits to learn
                </span>
                <p className={styles.description}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci modi corporis accusamus dolores, aliquam suscipit aperiam ipsa! Accusamus cumque adipisci veritatis praesentium reiciendis
                  ratione quae, facilis dolorum. Dolor, accusantium iusto?
                </p>
                <button className={styles.button}>
                    <MdPlayCircleFilled/>
                    Watch
                </button>
            </div>
        </div>
         <div className={styles.item}>
         <div className={styles.text}>
           <span className={styles.notification}>🚀 Coming Soon</span>
           <h3 className={styles.title}>
             New server actions are available, partial pre-rendering is coming
             up!
           </h3>
           <span className={styles.subtitle}>Boost your productivity</span>
           <p className={styles.desc}>
             Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Reprehenderit eius libero perspiciatis recusandae possimus.
           </p>
           <button className={styles.button}>
             <MdReadMore />
             Learn
           </button>
         </div>
        </div>
       </div>
   
    )
}

export default Rightbar;