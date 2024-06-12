"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TbUserSquareRounded } from 'react-icons/tb';
import { GiSmartphone } from 'react-icons/gi';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { FiChevronLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function RegistrationPage({ setShowRegistration }: any) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Add validation here to check if passwords match and meet requirements
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          lastname,
          phone,
          address,
          password,
          role: "user",
          image: "data:image/png;base64,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",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inscription réussie!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        console.log("Registration successful");
      } else {
        toast.error(`Erreur: ${data.error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      toast.error("Erreur de réseau", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Network error:", error);
    }
  };

  return (
    <React.Fragment>      <ToastContainer /> 
    <div className="registration-page bg-gray-100 ">
      <div className='d-flex flex-row mb-5'> <div style={{ top: "11px", position: "relative" }} onClick={() => setShowRegistration(false)} ><FiChevronLeft size={32} /></div>
        <h1 className='ml-5 pl-5'>Inscription</h1>
      </div>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="mb-4">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <TbUserSquareRounded />
            </div>
            <label>Nom</label>
            <input type="text" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder='Saisissez votre nom' onChange={(event) => setName(event.target.value)} />
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <TbUserSquareRounded />
            </div>
            <label>Prénom</label>
            <input type="text" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder='Saisissez votre Prénom' onChange={(event) => setLastname(event.target.value)} />
          </div>
        </div>


        <div className="mb-2">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <GiSmartphone />
            </div>
            <label>Téléphone</label>
            <input type="tel" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder='06 12 34 56 78' onChange={(event) => setPhone(event.target.value)} />
          </div>
        </div>



        <div className="mb-2">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <MdOutlineAttachEmail />
            </div>
            <label>E-mail</label>
            <input type="email" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder='Saisissez votre e-mail' onChange={(event) => setEmail(event.target.value)} required />
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <MdOutlineAttachEmail />
            </div>
            <label>Address</label>
            <input type="Address" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder='Saisissez votre Addresse' onChange={(event) => setAddress(event.target.value)} required />
          </div>
        </div>



        <div className="mb-2">
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <RiLockPasswordFill />
            </div>
            <label>Mot de passe</label>
            <input type="password" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder=' saissiez votre Mot de passe' onChange={(event) => setPassword(event.target.value)} required />
          </div>
        </div>

        <div className="mb-4">



          <div className="mb-2">
            <div className="flex items-center mb-5">
              <div className="mr-2">
                <RiLockPasswordFill />
              </div>
              <label>Confirmer votre Mot de passe</label>
              <input type="password" className='w-64 input ml-2 border rounded-lg p-1 outline-none' placeholder=' Confirmez votre mot de passe' onChange={(event) => setConfirmPassword(event.target.value)} required />
            </div>
          </div>
        </div>

        <p className="text-xl mb-5">
          1 Minuscule & 1 Majuscule <br /> 1 chiffre (0-9) <br /> 8 caractères
        </p>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-xl block mx-auto mb-44">Je crée mon compte</button>

      </form>


      <Link href="/">
        <div className="flex justify-center mt-4 text-gray-500 text-xl ">Mention légales</div>
      </Link>

    </div>
    </React.Fragment>

  );

}

export default RegistrationPage;
