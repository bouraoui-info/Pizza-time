import { store } from "@/app/store";
import React, { SyntheticEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { v4 } from 'uuid';
import { useSnapshot } from "valtio";

type AddCategorieType = {
    showModal: boolean,
    setShowModal: Function,

}

export default function AddCategorie({ showModal, setShowModal }: AddCategorieType) {
    const { selectedResto } = useSnapshot(store)
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [isImageInvalide, setIsImageInvalide] = useState(false)

    const isValidImageURL = (url: string) => {
        // Expression régulière pour vérifier le format de l'URL d'une image
        const imagePattern = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
        return !!imagePattern.test(url);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isValidImageURL(image)) {
            setIsImageInvalide(true)
        }
        else {
            setShowModal(false);
            const shopDataString = localStorage.getItem("shop");
            let id = v4()
            let NEwCategories = {
                id: id,
                color: "#FFFFFF",
                items: [],
                ranks: {
                    default: 1,
                    orderOverride: [
                        {
                            Order: 1,
                            IdShop: 2,
                        },
                    ],
                },
                title: title,
                video: {
                    url: "",
                    type: "",
                },
                idCard: 1,
                archive: false,
                imageUrl: {
                    Default: {
                        urlDefault: image,
                        salesSupport: [],
                    },
                    override: [
                        {
                            shopId: "",
                        },
                        {
                            info: [],
                            salesSupport: [],
                        },
                    ],
                },
                reference: "00085",
                linkedTags: [],
                description: {
                    Default: {
                        impression: [],
                        nameDefault: "",
                        salesSupport: [],
                    },
                },
                displayName: {
                    Default: {
                        impression: [],
                        nameDefault: "junior",
                    },
                },
                linkedItems: [],
                categoryChild: [],
                categoryParent: "",
                visibilityInfo: {
                    default: {
                        Emporter: {
                            id: "d99758ef-0049-4513-90fe-ca44bd069aac",
                            visibility: true,
                        },
                        Livraison: {
                            id: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
                            visibility: true,
                        },
                        "Sur place": {
                            id: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                            visibility: true,
                        },
                        Restaurant: {
                            id: "0f0e6661-8f11-4ed8-af32-55a53e45dfd2",
                            visibility: true,
                        },
                    },
                    isVisible: true,
                    basicCompositionVisibility: true,
                },
                categoryLiaison: [],
                isNameDisplayed: false,
                linkedChildCategories: [],
                isInformationModeActivated: true,
            }
            await fetch(`http://localhost:3001/api/restaurant/addCategorie?idResto=${selectedResto}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        card: {
                            [id]: { ...NEwCategories }
                        }
                    }),
                });
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter catégorie</Modal.Title>
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
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter</button>
                </form>

            </Modal.Body>
        </Modal>
    );
}
