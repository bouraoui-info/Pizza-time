import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

type AddProduitProps = {
    showModal: boolean;
    setShowModal: Function,

}

export default function AddProduit({ showModal, setShowModal }: AddProduitProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addproduit');
            // Optionally, you can handle success or redirect to another page
            console.log('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);


    

return (
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">URL de l'image</label>
                    <input
                        id="image"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Entrez l'URL de l'image"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Titre</label>
                    <input
                        id="title"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Entrez le titre"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                        id="Price"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Entrez le Prix"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter</button>
            </form>

        </Modal.Body>
    </Modal>
);
}

