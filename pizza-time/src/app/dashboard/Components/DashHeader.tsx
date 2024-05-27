import DropDownMenu from "@/app/common/DropDownMenu";
import Container from "../../common/Container";
import NotifyDropdown from "../../dashboard/Components/NotifyDropdown";
import Image from "next/image";
import { User } from "../../globals";

interface Props {
    user: User;
}

const DashHeader = ({ user }: Props) => {
    return (
        <Container>
            <header className="grid grid-cols-2 py-5 px-4 md:px-12 items-center sticky top-0 z-10 rounded-md bg-white shadow-md">
                {/* Left Area */}
                <div className="flex items-center justify-end gap-x-8">
                    <Image 
                        src="/Objects/logo.jpg" 
                        width={100} 
                        height={100} 
                        alt="logo" 
                        priority={true}  // Add priority for LCP
                    />
                </div>
                {/* Right Area */}
                <div className="flex items-center justify-end gap-x-4">
                    <NotifyDropdown />
                </div>
            </header>
        </Container>
    );
};

export default DashHeader;
