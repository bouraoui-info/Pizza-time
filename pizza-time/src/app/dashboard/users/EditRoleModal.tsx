"use client"
import Modal from "react-modal";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import EditRoleForm from "./EditRoleForm";

type Props = {
    user: {
        id: number;
        email: string;
        address: string;
    };
};

const EditRoleModal = ({ user }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <HiOutlinePencilSquare onClick={openModal} className="cursor-pointer h-6 w-6" />
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <div className="modal-header">
                    <h2>Edit Role</h2>
                </div>
                <EditRoleForm user={user} />
            </Modal>
        </>
    );
};

export default EditRoleModal;