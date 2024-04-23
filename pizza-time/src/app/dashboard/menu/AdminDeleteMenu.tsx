// AdminDeleteMenu.tsx
import React, { useState } from 'react';

interface AdminDeleteMenuProps {
menuId: string;
}

const AdminDeleteMenu: React.FC<AdminDeleteMenuProps> = ({ menuId }) => {
const [productId, setProductId] = useState('');

const handleDelete = async () => {
try {
const response = await fetch(`/api/deleteproduct/${productId}`, {
method: 'DELETE',
headers: {
'Content-Type': 'application/json',
},
});
// Optionally, you can handle success or refresh the product list
console.log('Product deleted successfully');
} catch (error) {
console.error('Error deleting product:', error);
}
};

return (
<div>
<h2>Delete Product</h2>
<label>
Product ID:
<input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
</label>
<button onClick={handleDelete}>Delete Product</button>
</div>
);
};

export default AdminDeleteMenu;

