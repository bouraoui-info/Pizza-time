import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Modal from "react-modal";


export default function Deleteresto({ idResto }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const OpenModal = () => setIsOpen(true);
    const handleDelete = async () => {

        const response = await fetch(`http://localhost:3001/api/restaurant/${idResto}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

        if (response.ok) {
            // Handle successful deletion here
            console.log('Restaurant deleted successfully');
        } else {
            // Handle error here
            console.error('Failed to delete the restaurant');
        }

        closeModal();
    };


    return (
                <>
            <HiOutlineTrash
                onClick={OpenModal}
                className="cursor-pointer h-6 w-6 text-red-500"
            />
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this Restaurant ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>No, cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => { handleDelete(); closeModal(); }}>Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

