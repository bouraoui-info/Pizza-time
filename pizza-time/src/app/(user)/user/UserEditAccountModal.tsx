import { FormEvent, useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from 'react-modal';

type Props = {
    user: any;
    updateUserProfile: (phone: string) => void;
};

const UserEditAccountModal = ({ user, updateUserProfile }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(user.email || "");
    const [name, setName] = useState(user.name || "");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const editUserProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserProfile(email);
        closeModal();
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    };

    return (
        <>
            <button
                className="flex items-center px-4 py-2 space-x-4 bg-green-600 text-white rounded-full"
                onClick={openModal}
            >
                <span>Edit Profile</span>
                <HiPencil className="shrink-0" />
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <div>
                    <h2>Account Info</h2>
                    <form className="flex flex-col space-y-8" onSubmit={editUserProfile}>
                        <div className="flex flex-col space-y-8">
                            <div>
                                <label htmlFor="Name" className="form-label">
                                    Name
                                </label>
                                <input
                                    className="form-input"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-green-600 hover:bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            <HiPencil className="mr-1 -ml-1 w-4 h-4" />
                            Edit Profile
                        </button>

                        <button
                            className="text-white inline-flex items-center bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default UserEditAccountModal;
