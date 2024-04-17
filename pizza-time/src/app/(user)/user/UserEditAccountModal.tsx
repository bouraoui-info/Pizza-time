import React, { FormEvent, useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

type Props = {
    user: any;
    updateUserProfile: (formData: FormData) => void;
    setIsOpen: Function;
    isOpen: boolean;
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

    const closeModal = () => setIsOpen(false);

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
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editUserProfile}>
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
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ maxWidth: "100px", marginTop: "10px" }}
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
                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
