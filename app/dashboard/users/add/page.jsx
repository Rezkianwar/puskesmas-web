"use client";
import { message } from "antd";
import { addUsers } from "../../../lib/actions/actionUsers";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";

const AddUserProduct = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Konversi FormData menjadi objek
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      address: formData.get("address"),
      isAdmin: formData.get("isAdmin") === "true", // Konversi string "true"/"false" ke boolean
      isActive: formData.get("isActive") === "true", // Konversi string "true"/"false" ke boolean
    };

    try {
      const result = await addUsers(data);
      if (result.success) {
        message.success(result.message || "User berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(() => router.push("/dashboard/users"), 1000); // Redirect setelah 2 detik
      } else {
        message.error(
          result.message || "Gagal menambahkan user. Silakan coba lagi."
        );
      }
    } catch (error) {
      message.error("Gagal menambahkan user. Silakan coba lagi.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input type="tel" placeholder="phone" name="phone" />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <select name="isAdmin" id="isAdmin">
          <option value={false} hidden>
            Is Admin
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true} hidden>
            Is Active
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows="5"
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserProduct;
