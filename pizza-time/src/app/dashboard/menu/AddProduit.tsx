import { setSelectedCat, store } from '@/app/store';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
type AddProduitProps = {
    showModal: boolean;
    setShowModal: Function,

}

export default function AddProduit({ showModal, setShowModal }: AddProduitProps) {
    const { selectedResto, selectedCat } = useSnapshot(store)
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const handleCloseModal = () => setShowModal(false);
    const [isImageInvalide, setIsImageInvalide] = useState(false);
    // Expression régulière pour vérifier le format de l'URL d'une image
    const isValidImageURL = (url: string) => {
        const imagePattern = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
        return !!imagePattern.test(url);
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productID = uuidv4();
            const response = await fetch(`http://localhost:3001/api/restaurant/${selectedResto}/${selectedCat}/addItem`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "card": {
                        id: productID,
                        title: title,
                        price: price,
                        imageUrl: {
                            Default: {
                                urlDefault: image,
                                salesSupport: []
                            }
                        }
                    }
                }),
            });
            console.log('Product added successfully', response);
            toast.success('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        }
    };
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
                            onChange={(e) => {
                                if (isValidImageURL(e.target.value)) {
                                    setIsImageInvalide(false);
                                    setImage(e.target.value)
                                }
                            }}
                            placeholder="Entrez l'URL de l'image"
                            required
                        />
                        {isImageInvalide && <p className="text-red-500 text-xs italic">invalid image</p>}
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

