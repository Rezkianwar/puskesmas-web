"use client";
import { message } from "antd";
import { addCard } from "../../../lib/actions/actionCards";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/cards/addCards/addCards.module.css";

const AddCardBerita = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Konversi FormData menjadi objek
    const data = {
      img: formData.get("img"),
      title: formData.get("title"),
      description: formData.get("description"),
    };

    try {
      const result = await addCard(data);
      if (result.success) {
        message.success(result.message || "Card Berita berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(() => router.push("/dashboard/cards"), 1000); // Redirect setelah 2 detik
      } else {
        message.error(
          result.message || "Gagal menambahkan card Berita. Silakan coba lagi."
        );
      }
    } catch (error) {
      message.error("Gagal menambahkan Card Berita. Silakan coba lagi.");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="img" required />
        <input type="text" placeholder="Title" name="title" required />
        <textarea
          id="description"
          placeholder="Description"
          name="description"
          className={styles.textarea}
          rows={20}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCardBerita;
