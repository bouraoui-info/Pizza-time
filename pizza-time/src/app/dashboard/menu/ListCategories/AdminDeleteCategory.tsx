import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { store } from "@/app/store";
import { useSnapshot } from "valtio";
import toast from "react-hot-toast";

export default function AdminDeleteCategory() {
    const { selectedResto, selectedCat } = useSnapshot(store);

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const OpenModal = () => setIsOpen(true);
    const [showModal, setShowModal] = useState(false);
    const handleDelete = async () => {
        setShowModal(false);
        const response = await fetch(`http://localhost:3001/api/restaurant/${selectedCat}/${selectedResto}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error('Failed to delete the category');
        }
        await response.json();
        toast.success('Category successfully deleted');
        router.push("/dashboard/menu/ListCategories");
    }

    try {
        handleDelete();
    } catch (error) {
        toast.error('Failed to delete the category');
        console.error('Delete error', error);
    }

return (
    <>
        <HiOutlineTrash
            onClick={OpenModal}
            className="cursor-pointer h-6 w-6 text-red-500"
        />
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white">
                    <HiOutlineTrash
                        className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
                        aria-hidden="true"
                    />
                    <p className="mb-4 text-gray-500">
                        Are you sure you want to delete this Category?
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border
                                border-gray-200 hover:bg-gray-100 focus:outline-none hover:text-gray-900"
                        >
                            No, cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700"
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </>
);
};
