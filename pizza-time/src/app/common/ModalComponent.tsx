import React, { useState } from 'react';
import Image from 'next/image';
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Modal from 'react-modal';
import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import { TimePicker } from 'antd'; // Import TimePicker from Ant Design
import moment from 'moment'; // Import moment for time manipulation
import { CartType, Menu } from "@/types";
import { setTime, setpanier, store, usecartStore } from '../store';
import { useSnapshot } from 'valtio';
import moto from '../../../public/Objects/moto.png';
import panierrepas from '../../../public/Objects/panierrepas.png';
import Location from '../../app/Maps/Location';

type ModalProps = {
  isOpenModal: boolean;
  title: string;
  closeModal: () => void;
  menu: Menu; // Assuming Menu is a custom type
  setIsOpenModal: Function;
  image: any;
  user: any;
  setNumber: Function;
  number: number
}

const customStyles = {
  content: {
    // inset:" 56% auto auto 50% !important",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
};

const ModalComponent: React.FC<ModalProps> = ({ isOpenModal, setIsOpenModal, title, image, menu, user, setNumber, number }: ModalProps) => {
  const { panier } = useSnapshot(store);
  const { time } = useSnapshot(store);
  const [selectedTime, setSelectedTime] = useState<moment.Moment | null>(null); // State for selected time
  const [isOpen, setIsOpen] = useState(false);
  const MenuToAdd = ""
  const closeModal = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const [cartCount, setCartCount] = useState(0);
  const [showlocation, setShowlocation] = useState(false);
  const [saleMode, setSaleMode] = useState("");
  const calculateTotalNumberOfArticles = (cartItems: any) => {
    let totalArticles = 0;

    // Itérer sur chaque article dans le panier et ajouter ses quantités au total
    cartItems.forEach((item: any) => {
      totalArticles += item.quantity;

    });
    localStorage.setItem("totalArticles", JSON.stringify(totalArticles));
    setNumber(totalArticles)
  };
  const PutItemsIntoCart = (MenuToAdd: any) => {
    if (saleMode === "") {
      alert("Veuillez choisir un mode de vente");
      return;
    }
    else if (!selectedTime) {
      alert("Veuillez choisir un temps");
      return;
    }
    else; setIsOpenModal(false);


    let newpanier: any = [...JSON.parse(JSON.stringify(panier))];

    newpanier.push({ ...MenuToAdd, saleMode: saleMode });
    calculateTotalNumberOfArticles(newpanier)
    setpanier(newpanier)
    setTime(selectedTime.format("HH:mm"))
  }


  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => {
          setIsOpenModal(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalHeader
          className="text-capitalize mt-5"
          toggle={() => {
            setIsOpenModal(false);
          }}
        >
          <h1>Mode de retrait</h1>
        </ModalHeader>

        <ModalBody>
          <div className="flex items-center justify-center space-x-4">
            <div onClick={() => { setSaleMode("Emporter"); setShowlocation(false) }} >
              <Image src={moto} alt="moto" className="border rounded-md m-2 hidden md:block w-24 h-24" style={{ backgroundColor: saleMode === "Emporter" ? "green" : "" }} />
              <div className="ml-2">A Importer</div>
            </div>
            <div onClick={() => { setSaleMode("Livraison"); setShowlocation(true) }}>
              <Image src={panierrepas} alt="pizza" className="border rounded-md m-2 hidden md:block w-24 h-24" style={{ backgroundColor: saleMode === "Livraison" ? "green" : "" }} />
              <div className="ml-2">En Livraison</div>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <div style={{ marginLeft: "20%" }}>
              <p className="text-lg font-semibold ml-5 pl-5 mt-2">Aujourd'hui</p>
            </div>

            {/* Affichage de la barre de localisation */}
            <div className='mb-5'>
              {showlocation ? (
                <div style={{ position: "fixed", right: "10%" }}>
                  <Location />
                </div>
              ) : null}
            </div>

            <div className='mt-5' style={{ marginLeft: "20%" }}><Image src={image} width={160} height={100} alt="menu-img" /></div>
          </div>
          {menu && menu.prepType && (
            <Disclosure>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Preparation</span>
                <HiChevronDown />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pb-2 pt-4">
                {menu.prepType.map((prep: any, index: number) => (
                  <div key={index} className="flex my-2">
                    <input
                      className="w-6 h-6 text-green-600 bg-gray-100 rounded border-green-500 focus:ring-green-500  focus:ring-2"
                      type="checkbox"
                    />
                    <span className="ml-3">{prep}</span>
                  </div>
                ))}
              </Disclosure.Panel>
            </Disclosure>
          )}
          {/* TimePicker component */}
          <div className="mt-4">
            <p className="text-center mb-3">Selectionner le Temps </p>
            <TimePicker
              // defaultValue={selectedTime} // Set default value
              onChange={(time: any) => setSelectedTime(time)} // Handle time change
              format="HH:mm" // Set format
              minuteStep={15} // Set minute step
              className={`w-full mt-4 ${!selectedTime ? "border border-red-500" : ""}`}
            />
          </div>
        </ModalBody>

        <ModalFooter className="border-top-0">
          <button
            className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
            onClick={() => setIsOpenModal(false)}
          >
            Close
          </button>

          <button
            className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
            onClick={() => {
              PutItemsIntoCart(menu)
            }}
          >
            Add to Cart :$ {menu && menu.price}

          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
