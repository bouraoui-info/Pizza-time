"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TbUserSquareRounded } from 'react-icons/tb';
import { GiSmartphone } from 'react-icons/gi';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { FiChevronLeft } from 'react-icons/fi';
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
      console.error('Passwords do not match');
      return;
    }

    // Send the registration data to your backend API
    const response = await fetch('http://localhost:3001/api/users ', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, lastname, phone, address, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Handle successful registration, e.g., redirect to login page
      console.log('Registration successful');
    } else {
      // Handle registration errors
      console.error('Registration failed:', data.error);
    }
  };

  return (
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
  );

}

export default RegistrationPage;
