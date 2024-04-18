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
  const { isDropdownOpen } = useSnapshot(store)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
  };
  const handleClose=()=>{
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="w-full rounded-lg shadow-xl max-w-md py-4">
      <div>
        <h2 className="text-lg text-center py-5 md:text-2xl lg:text-3xl leading-tight tracking-tighter text-gray-600 sm:text-4xl">My Profile</h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        {user && (
          <>
            {user.image ? (
              <Image
                src={user.image}
                alt="user-img"
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xl">No Image</span>
              </div>
            )}

            <div>
              <h1 className="text-xl text-center my-5 font-semibold leading-tight tracking-tight text-gray-500 md:text-2xl">
                {user.email}
              </h1>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="text-white inline bg-green-600 hover:bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
                  onClick={openModal}
                >
                  Edit Profile
                </button>
                {isModalOpen ? <UserEditAccountModal
                  user={user}
                  updateUserProfile={updateUserProfile}
                  isOpen={isModalOpen}
                  setIsOpen={closeModal}
                /> : null}
                <button
                  className="text-white inline-flex bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
                  onClick={logout}
                >
                  Logout
                </button>
                <button
                  className="text-white inline-flex bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
