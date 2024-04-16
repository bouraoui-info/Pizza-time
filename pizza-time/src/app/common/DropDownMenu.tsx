import React, { useState } from 'react';
import { CgMail } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import RegistrationPage from '../inscription/page';
import { setIsDropdownOpen, store } from '../store';
import { useSnapshot } from 'valtio';
import UserEditAccountModal from '../(user)/user/UserEditAccountModal';
import UserDetails from '../(user)/user/UserDetails';
import { User } from '../../../../backend/src/users/user.entity';

function DropDownMenu() {
  const [error, setError] = useState('');
  const { isDropdownOpen } = useSnapshot(store);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleClose = () => {
    setIsDropdownOpen(false);
  };

  const handleRegistrationClick = () => {
    setShowRegistration(true);
    console.log('Clicked on registration link. showRegistration:', showRegistration);
  };

  const handleLoginClick = async () => {
    // Your login logic here
  };

  const handleLogoutClick = () => {
    // Your logout logic here
  };

  const user = localStorage.getItem('user');

  return (
    <div className="fixed top-5 right-0 bg-gray-100 p-4 border rounded-lg shadow-lg h-100">
      {!showRegistration && user === null && (
        // Render login form if user is not authenticated and registration page is not shown
        <ul className="menu">
          {/* Login form */}
        </ul>
      )}
      {showRegistration && user === null && (
        // Render registration page if user is not authenticated and registration page is shown
        <RegistrationPage setShowRegistration={setShowRegistration} />
      )}
      {user !== null && (
        // Render user details and edit modal if user is authenticated
        <>
          <UserDetails user={JSON.parse(user)} />
          <UserEditAccountModal user={JSON.parse(user)}  
          updateUserProfile={function (phone: string): void {
            throw new Error('Function not implemented.');
          }} />
        </>
      )}
      {error && (
        // Render error message if there's an error
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
          <button onClick={() => setError('')} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownMenu;
