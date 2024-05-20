"use client"
import React, { useState } from "react";
import MenuCard from "./MenuCard";
import { Menu } from "../../types";
import ModalComponent from "../common/ModalComponent";

type Props = {
  menu: Menu;
  number: number;
  setNumber:Function,
  isModalOpen:boolean,
  setIsModalOpen:Function
};

const MenuModal = ({isModalOpen,setIsModalOpen, menu,number ,setNumber }: Props) => {

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <React.Fragment>
      <MenuCard menu={menu} openModal={openModal} />
      {isModalOpen && <ModalComponent setNumber={setNumber} number={number} isOpenModal={isModalOpen} setIsOpenModal={setIsModalOpen} closeModal={closeModal} title={menu.title} menu={menu} image={menu.imageUrl.Default.urlDefault} user={undefined}/>}
    </React.Fragment>
  );
  
};
export default MenuModal;
