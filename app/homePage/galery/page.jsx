import { Image } from "antd";
import styles from "../../ui/homePage/galery/galery.module.css";

const itemGalery = [
  {
    title: "Puskesmas Silago",
    img: "/galery1.jpg",
  },
  {
    title: "Puskesmas Silago",
    img: "/galery2.jpg",
  },
  {
    title: "Puskesmas Silago",
    img: "/galery3.jpg",
  },
];

const Galery = () => {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.header}>
        <h1>Galery</h1>
      </div>
      <div className={styles.galleryItems}>
        {itemGalery.map((item, index) => (
          <div key={index} className={styles.galleryItem}>
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={200}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galery;
