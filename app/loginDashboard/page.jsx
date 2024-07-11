"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../ui/login/login.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Image, message } from "antd";

const LoginDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [info, setInfo] = useState({ username: "", password: "" });
  const [error] = useState("");
  const [pending, setPending] = useState(false);

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.username || !info.password) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      setPending(true);
      console.log("Signing in with:", info);
      const res = await signIn("credentials", {
        username: info.username,
        password: info.password,
        redirect: false,
      });
      console.log("Sign in response:", res);

      if (res.error) {
        message.error("Invalid username or password");
      } else {
        // Mendapatkan sesi pengguna untuk memastikan `isAdmin`
        const session = await fetch("/api/auth/session").then((res) =>
          res.json()
        );
        console.log("Session:", session);

        if (session.user && typeof session.user.isAdmin !== "undefined") {
          const isAdmin = session.user.isAdmin;
          console.log("isAdmin:", isAdmin);

          const redirectUrl =
            searchParams.get("redirect_url") ||
            (isAdmin ? "/dashboard" : "/dashboardPegawai");
          message.success("Login successful");
          router.push(redirectUrl);
        } else {
          message.error("Failed to retrieve user session data");
        }
      }
    } catch (error) {
      console.error("Error during signIn:", error);
      message.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Image
          src="/login.svg"
          alt="logo"
          width={300}
          height={200}
          preview={false}
        />
        <div className={styles.top}>
          <h1>LOG-IN </h1>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.input}>
          <div className={styles.user}>
            <label> Username </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={info.username}
              onChange={handleInput}
            />
          </div>
          <div className={styles.password}>
            <label> Password </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={info.password}
              onChange={handleInput}
            />
          </div>
        </div>
        <button className={styles.button} disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginDashboard;
