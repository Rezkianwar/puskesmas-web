import styles from "./wellcome.module.css";

const wellcome = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Selamat Datang di Dashboard Pegawai Puskesmas Silago 🔥
      </h2>
      <div>
        <video controls autoPlay loop className={styles.video}>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default wellcome;
