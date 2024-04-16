import { useState, useEffect } from 'react';
import Image from "next/image";
import UserEditAccountModal from "../user/UserEditAccountModal";
import { getRepository } from 'typeorm';
import 'reflect-metadata';


type Props = {
  user: any; 
};

export default function UserDetails ({ user }: Props)  {
  const [userData, setUserData] = useState<any>("");
  useEffect(() => {
    // Function to fetch user data based on user's email
    const fetchUser = async () => {
      const userRepository = getRepository(user);

      try {
        // Fetch user data using TypeORM query
        const fetchedUser :any = await userRepository.findOne({ where: { email: user.email } });

        if (fetchedUser) {
          setUserData(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
    };

    fetchUser(); // Fetch user data when component mounts
  }, [user.email]);

  return (
    <div className="flex flex-col items-center justify-center">
      {userData && (
        <>
          {user.image ? (
            <Image
              src={user.image}
              alt="pro-img"
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
              {userData.email}
            </h1>
            <p className="text-gray-500 mb-4">{userData.email}</p>
            <UserEditAccountModal user={userData} updateUserProfile={function (phone: string): void {
                          throw new Error('Function not implemented.');
                      } } />
          </div>
        </>
      )}
    </div>
  );
};

 
