"use client";

import { UpdateUsers } from "../../../lib/actions/actionUsers";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
import { useRouter } from "next/navigation";
import { Image, message } from "antd";
import { useState } from "react";

const UpdateUserForm = ({ user, onUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: user._id,
    username: user.username,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await UpdateUsers(formData);
      if (result.success) {
        message.success(result.message || "User berhasil di-update!");
        if (typeof onUpdate === "function") {
          onUpdate(formData);
        }
        setTimeout(() => router.push("/dashboard/users"), 1000);
      } else {
        message.error(
          result.message || "Gagal meng-update user. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Gagal meng-update user. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={user.img || "/noavatar.png"}
            alt=""
            width={100}
            height={100}
          />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData._id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            placeholder="Email"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            disabled
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          ></textarea>
          <label>Is Admin</label>
          <select
            name="isAdmin"
            value={formData.isAdmin}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Is Active</label>
          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
