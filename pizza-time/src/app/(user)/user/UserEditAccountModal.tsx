import React, { FormEvent, useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Image from "next/image";

type Props = {
    user: any;
    updateUserProfile: (user: any) => void;
    setIsOpen: Function;
    isOpen: boolean;
};

type UserData = {
    user_id: number;
    nom: string;
    prenom: string;
    tele: string;
    email: string;
};

export default function UserEditAccountModal({
    user,
    updateUserProfile,
    setIsOpen,
    isOpen,
}: Props) {
    const [email, setEmail] = useState(user.email || "");
    const [name, setName] = useState(user.name || "");
    const [lastname, setLastname] = useState(user.lastname || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [address, setAddress] = useState(user.address || "");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(user.image || "");
    const [role, setRole] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);

    const closeModal = () => setIsOpen(false);

    const editUserProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userStore = localStorage.getItem("user");
        const userId = userStore ? (JSON.parse(userStore)).id : null;
               
        
        if (userId===null) {
            console.error("No user ID found in local storage.");
            return;
        }
        
let user:any={name,lastname,email,phone,address,role,image}
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                method: 'PUT',
                body:JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }

            const data = await response.json();
            console.log(data);
            updateUserProfile(data.user);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
            closeModal();
        } catch (err) {
            console.error('There was a problem with your fetch operation:', err);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setLastname(user.lastname);
            setPhone(user.phone);
            setAddress(user.address);
            setRole(user.role)
            setImage(user.image)
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
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
                    <Form >
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={onChange}
                            />
                            {imagePreview && (
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                            )}
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e:any)=>editUserProfile(e)}>
                            Save changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
