
"use client" 
import { useState, useEffect } from 'react';
import Image from "next/image";
import UserEditAccountModal from "../user/UserEditAccountModal";
import { getRepository } from 'typeorm';

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
  // console.log({userData});
  
//  const fetchUser = async () => {
//   console.log({user})
//   setUserData(user);

//       // try {
//       //   // Fetch user data using TypeORM query
//       //   const fetchedUser: any = await userRepository.findOne({ where: { email: user.email } });
//       //   console.log("Fetched User:", fetchedUser);

//       //   if (fetchedUser) {
//       //     setUserData(user);
//       //   }
//       // } catch (error) {
//       //   console.error('Error fetching user data:', error);
//       // }
//     };
//   useEffect(() => {
//     fetchUser();
//     console.log({userData});
//      // Fetch user data when component mounts
//   }, []);
console.log({user});

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
              <p className="text-gray-500 mb-4">{user.email}</p>
              <UserEditAccountModal user={user} updateUserProfile={updateUserProfile} />
              <button
                className="text-white inline-flex items-center bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
