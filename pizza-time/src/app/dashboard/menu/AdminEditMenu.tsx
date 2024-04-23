import React, { useState, useEffect } from 'react';

type Menu = {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
};

type Props = {
  menuProp: Menu;
};

const AdminEditMenu: React.FC<Props> = ({ menuProp }) => {
  const [product, setProduct] = useState<Menu>(menuProp);

  useEffect(() => {
    // Fetch product details when productId changes
    if (product.id) {
      fetchProduct(product.id);
    }
  }, [product.id]);

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
      const response = await fetch(`/api/editproduct/${product.id}`, {
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
        <input type="text" value={product.id} onChange={(e) => setProduct({ ...product, id: e.target.value })} />
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