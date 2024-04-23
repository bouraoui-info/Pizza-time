"use client"
import { useState } from "react";
import DashHeader from "./DashHeader";
import DashSideBar from "./DashSideBar";
import { User } from "../../globals";

interface DashWrapperProps {
  children: React.ReactNode;
  user: User; // Ajoutez la propriété user avec le type User
}

const DashWrapper = ({ children, user }: DashWrapperProps) => {
  const [show, setShow] = useState(false);

  const showSideBar = () => {
    setShow(!show);
  };

  return (
    <div className="min-h-screen bg-slate-200 ">
      <DashSideBar show={show} showSideBar={showSideBar} />

      <section
        className={`relative  ml-[6.5rem]  transition-all duration-1000 ease-out    ${
          show && " md:ml-[10rem]"
        }`}
      >
        <DashHeader user={user} /> {/* Utilisez la variable user ici */}
        {children}
      </section>
    </div>
  );
};

export default DashWrapper;
