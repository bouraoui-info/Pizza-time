"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { store } from "@/app/store"; // Adjust the import path to your store
import Header from "../app/common/Header";
import SideBar from "../app/common/SideBar";
import LogoBanner from "../app/Home/LogoBanner";
import Boutiques from "../app/Home/Boutiques";
import Footer from "./common/Footer";

export default function Home() {
  const router = useRouter();
  const { user } = useSnapshot(store); // Assuming user info is stored in your Valtio store

  // useEffect(() => {
  //   if (user?.role === "admin") {
  //     router.push("/dashboard");
  //   }
  // }, [user]);

  return (
    <main className="">
      <Header />
      <SideBar />
      <LogoBanner />
      <Boutiques />
      <Footer />
    </main>
  );
}
