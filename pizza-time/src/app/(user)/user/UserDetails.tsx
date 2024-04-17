
"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import UserEditAccountModal from "../user/UserEditAccountModal";
type Props = {
  user: any;
};

export default function UserDetails({ user }: Props) {
  // const [userData, setUserData] = useState<any>(user??{});
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("user");

  };


  function updateUserProfile(formData: FormData): void {
    throw new Error('Function not implemented.');
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
              // Render a default image if user's image is not available
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xl">No Image</span>
              </div>
            )}

            <div>
              <h1 className="text-xl text-center my-5 font-semibold leading-tight tracking-tight text-gray-500 md:text-2xl">
                {user.email}
              </h1>
              <div className="flex flex-col items-center justify-center">
              <UserEditAccountModal user={user} updateUserProfile={updateUserProfile} />
              <button
                className="text-white inline-flex  bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 "
                onClick={logout}
              >
                Logout
              </button>
            </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
