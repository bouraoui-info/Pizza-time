// AdminEditMenu.tsx
import React, { useState, useEffect } from 'react';

const AdminEditMenu: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    // Fetch product details when productId changes
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/product/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/editproduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      // Optionally, you can handle success or redirect to another page
      console.log('Product edited successfully');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <label>
        Product ID:
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </label>
      <br />
      <label>
        Title:
        <input type="text" name="title" value={product.title || ''} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" name="price" value={product.price || ''} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={product.imageUrl || ''} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleEdit}>Edit Product</button>
    </div>
  );
};

export default AdminEditMenu;
