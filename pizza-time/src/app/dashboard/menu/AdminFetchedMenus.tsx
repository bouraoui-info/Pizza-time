// AdminFetchedMenus.tsx
import React from 'react';
import AdminAddMenu from './AdminAddMenu';
import AdminEditMenu from './AdminEditMenu';
import AdminDeleteMenu from './AdminDeleteMenu';
import Image from 'next/image';

type Menu = {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
};

type MenuEdge = {
    node: Menu;
};

type AdminFetchedMenusProps = {
    menus: MenuEdge[];
    isAdminLastPage: boolean;
    onLoadMore: (after: string) => void;
};

const AdminFetchedMenus: React.FC<AdminFetchedMenusProps> = ({
    menus,
    isAdminLastPage,
    onLoadMore,
}) => {
    const renderMenus = () => {
        return menus.map((menuEdge) => {
            const { id, title, category, price, image } = menuEdge.node;
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td>
                        <Image src={image} width={50} height={50} alt="Menu Image" />
                    </td>
                    <td>
                        <AdminEditMenu menu={menuEdge.node} />
                    </td>
                    <td>
                        <AdminDeleteMenu menuId={id} />
                    </td>
                </tr>
            );
        });
    };

    return (
        <div>
            <h2>Menus</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{renderMenus()}</tbody>
            </table>
            <AdminAddMenu />
            {isAdminLastPage && (
                <button onClick={onLoadMore}>Load More</button>
            )}
        </div>
    );
};

export default AdminFetchedMenus;
