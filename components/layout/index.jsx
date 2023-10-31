import React, { useEffect } from "react";
import styles from "./layout.module.css";
import Header from "../header";
import { useRouter } from "next/router";
import { Lexend } from "next/font/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { getSessionToken } from "../../utils/getSessionToken";

const lexend = Lexend({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();

  const getUserLogged = async (token) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const loginData = await response.json();
    dispatch(setUser(loginData));
  };

  useEffect(() => {
    if (getSessionToken()) {
      getUserLogged(getSessionToken());
    }
  }, []);

  return (
    <main className={lexend.className}>
      {pathname !== "/login" && <Header />}

      {children}
    </main>
  );
};

export default Layout;
