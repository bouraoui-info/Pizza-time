import { useState, useEffect } from "react";
import DropDownMenu from "@/app/common/DropDownMenu";
import Container from "../../common/Container";
import NotifyDropdown from "../../dashboard/Components/NotifyDropdown";
import Image from "next/image";

type Props = {
    userId: any;
};

const DashHeader = ({ userId }: Props) => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <Container>
            <header className="grid grid-cols-2 py-5 px-4 md:px-12 items-center sticky top-0 z-10 rounded-md bg-white shadow-md">
                {/* Left Area */}
                <div className="flex items-center justify-end gap-x-8">
                    <Image src="/logo.png" width={40} height={40} alt="logo" />
                </div>
                {/* Right Area */}
                <div className="flex items-center  justify-end gap-x-4">
                    <NotifyDropdown />
                    <DropDownMenu  />
                </div>
            </header>
        </Container>
    );
};

export default DashHeader;
