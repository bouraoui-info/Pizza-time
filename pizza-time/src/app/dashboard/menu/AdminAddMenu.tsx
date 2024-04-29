// AddProductForm.tsx
import { categoriesData } from '@/Data/categories-data';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi2';

const AddProductForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState("");
  const [longDescr, setLongDescr] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [prepType, setPrepType] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const closeModal = () => setIsOpen(false);
  const OpenModal = () => setIsOpen(true);


  const clearForm = async () => {
    setTitle("");
    setCategory("");
    setLongDescr("");
    setShortDescr("");
    setPrice("");
    setPrepType([""]);
    setImage("");
  };
  const requiredFields = [
    image,
    title,
    category,
    shortDescr,
    prepType,
    price,
  ];
  if (requiredFields.some((field) => !field)) {
    toast.error("Please fill in all required fields", { duration: 3000 });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/product');
      // Optionally, you can handle success or redirect to another page
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
        <button
      type="button"
      className="text-white inline-flex items-center whitespace-nowrap bg-green-600
       hover:bg-green-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      onClick={OpenModal}
    >
      <HiPlus className="mr-1 -ml-1 w-4 h-4" />
      Add Menu
      </button>

    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="form-label ">
            Title
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        
        </div>
          <div>
              <label htmlFor="price" className="form-label ">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-input"
                placeholder="$"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                className="form-input"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categoriesData.map((cat) => (
                  <option key={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="form-label">
                Long Description
              </label>
              <textarea
                id="description"
                rows={2}
                className="form-input"
                placeholder="Long description here"
                value={longDescr}
                onChange={(e) => setLongDescr(e.target.value)}
              ></textarea>
            </div>
          <label>
          <div className="sm:col-span-2">
              <label htmlFor="description" className="form-label">
                Short Description
              </label>
              <textarea
                id="description"
                rows={2}
                className="form-input"
                placeholder="Short description here"
                value={shortDescr}
                onChange={(e) => setShortDescr(e.target.value)}
              ></textarea>
            </div>
            Image URL:
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-green-600 hover:bg-green-700 focus:ring-4 
                       font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            <HiPlus className="mr-1 -ml-1 w-4 h-4" fill="currentColor" />
            Add Menu
          </button>
          </div>
        </form>
        </>
        );
};

        export default AddProductForm;