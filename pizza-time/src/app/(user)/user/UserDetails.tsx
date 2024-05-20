import { useState } from 'react';
import Image from 'next/image';
import UserEditAccountModal from '../user/UserEditAccountModal';
import { setIsDropdownOpen, store } from '../../../../src/app/store';
import { useSnapshot } from 'valtio';

type UserDetailsProps = {
  user: any;
  updateUserProfile: (formData: FormData) => void;
};

export default function UserDetails({ user, updateUserProfile }: UserDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDropdownOpen } = useSnapshot(store);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
  };
  
  const handleClose = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">My Profile</h2>
      <div className="flex flex-col items-center mt-4">
        {user && (
          <>
            {user.image ? (
              <Image
                src={user.image}
                alt="User Image"
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
                <span className="text-xl text-gray-500">No Image</span>
              </div>
            )}

            <h1 className="mt-4 text-xl font-semibold text-gray-600">{user.email}</h1>
            <div className="flex flex-col items-center mt-4 space-y-3">
              <button
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={openModal}
              >
                Edit Profile
              </button>
              {isModalOpen && (
                <UserEditAccountModal
                  user={user}
                  updateUserProfile={updateUserProfile}
                  isOpen={isModalOpen}
                  setIsOpen={closeModal}
                />
              )}
              <button
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Logout
              </button>
              <button
                className="px-6 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
