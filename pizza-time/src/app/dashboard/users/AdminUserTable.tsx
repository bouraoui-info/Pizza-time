// "use client";


import TableWrapper from "../Components/TableWrapper";
import EditRoleModal from "./EditRoleModal";
import Image from "next/image";

type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  address: string;
  image: string;
};

const fetchedUsers = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/users");
    return await response.json();
    
  } catch (error) {
    return []
    console.error("Error fetching users:", error);
  }
};

const AdminUserTable = async () => {

  const users= await fetchedUsers();

 
  return (
    <TableWrapper
      title={`All Users  `}
    >
      <table className="w-full border text-left text-slate-500 ">
        <thead className="text-xs overflow-x-auto whitespace-nowrap text-slate-700 uppercase bg-slate-100 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              image
            </th>
            <th scope="col" className="px-6 py-3 ">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              LastName
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user:any) => (
            <tr className="bg-white" key={user.id}>
              <td className="px-6 py-2">
                <Image
                  src={user.image}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-2">{user.name} </td>
              <td className="px-6 py-2">{user.lastname} </td>
              <td className="px-6 py-2">{user.email} </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <EditRoleModal user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default AdminUserTable;
