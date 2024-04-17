import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from 'react-modal';

type Props = {
    user: any;
    updateUserProfile: (formData: FormData) => void;
};

export default function UserEditAccountModal({ user, updateUserProfile }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(user.email || "");
    const [name, setName] = useState(user.name || "");
    const [lastname, setLastname] = useState(user.lastname || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [address, setAddress] = useState(user.address || "");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(user.image || "");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const editUserProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("lastname", lastname);
        formData.set("email", email);
        formData.set("phone", phone);
        formData.set("address", address);
        if (image) {
            formData.set("image", image);
        }
        updateUserProfile(formData);
    };


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setLastname(user.lastname);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }, [user]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result as string);
                }
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <>
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
                                    placeholder="type your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-8">
                            <div>
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-input"
                                    placeholder="type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Image</label>
                            <div className="mb-4 flex-col md:flex-row">
                                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                                    <img className="w-14 h-14 rounded-full" src={imagePreview} alt="User Avatar" />
                                </div>
                                <div className="md:w-2/3 lg:w-80">
                                    <input
                                        className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                                        type="file"
                                        id="formFile"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-8">
                            <div>
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    className="form-input"
                                    type="tel"
                                    id="phone"
                                    placeholder="Type your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-8">
                            <div>
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="address"
                                    placeholder="Type your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
