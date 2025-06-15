// src/features/products/AddProduct.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './productSlice';
import { useNavigate, Link } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [fileDataUrl, setFileDataUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const isValid = /^[a-zA-Z\s-]*$/.test(value);
      if (!isValid) return;
    }

    if (name === 'price' && Number(value) < 0) return;

    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileDataUrl(reader.result);
      setProduct({ ...product, image: '' }); // Clear URL input
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameIsValid = /^[a-zA-Z\s-]+$/.test(product.name);
    if (!nameIsValid) {
      alert('Product name must contain only letters, spaces or hyphens.');
      return;
    }

    dispatch(
      addProduct({
        ...product,
        id: Date.now(),
        image: fileDataUrl || product.image,
      })
    );
    navigate('/');
  };

  return (
    <div className="add-product-page">
      <div className="add-header">
        <h1 className="site-title">Flavor Vault</h1>
        </div>


      <div className="add-product-box">
        <h2>Add Product Details</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" required onChange={handleChange} />
          <input name="description" placeholder="Description" required onChange={handleChange} />
          <input name="price" placeholder="Price" type="number" required onChange={handleChange} />
          <input
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {(fileDataUrl || product.image) && (
            <img
              src={fileDataUrl || product.image}
              alt="Preview"
              className="image-preview"
            />
          )}
          <button type="submit">Add Product</button>
        </form>
        <Link to="/" className="home-button" title="Back to Home">🏠 Home</Link>
      </div>
    </div>
  );
};

export default AddProduct;


// // src/features/products/AddProduct.jsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addProduct } from './productSlice';
// import { useNavigate } from 'react-router-dom';
// import './AddProduct.css'; // External CSS

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//   });

//   const [imageUrl, setImageUrl] = useState('');
//   const [fileDataUrl, setFileDataUrl] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'name') {
//       const isValid = /^[a-zA-Z\s'-]*$/.test(value); // Allows letters, space, hyphen, apostrophe
//       if (!isValid) return;
//     }

//     if (name === 'price') {
//       if (Number(value) < 0) return;
//     }

//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const nameIsValid = /^[a-zA-Z\s'-]+$/.test(product.name);
//     if (!nameIsValid) {
//       alert('Product name can only contain letters, spaces, apostrophes, and hyphens.');
//       return;
//     }

//     const image = fileDataUrl || imageUrl;

//     dispatch(addProduct({
//       ...product,
//       image,
//       id: Date.now(),
//     }));

//     navigate('/');
//   };

//   return (
//     <div className="add-product-container">
//       <h2>Add New Product</h2>
//       <form className="product-form" onSubmit={handleSubmit}>
//         <input name="name" placeholder="Product Name" onChange={handleChange} required />
//         <input name="description" placeholder="Description" onChange={handleChange} required />
//         <input name="price" placeholder="Price" type="number" min="0" onChange={handleChange} required />
        
//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={imageUrl}
//           onChange={(e) => {
//             setImageUrl(e.target.value);
//             setFileDataUrl('');
//           }}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onloadend = () => {
//                 setFileDataUrl(reader.result);
//                 setImageUrl('');
//               };
//               reader.readAsDataURL(file);
//             }
//           }}
//         />

//         {(fileDataUrl || imageUrl) && (
//           <img
//             src={fileDataUrl || imageUrl}
//             alt="Preview"
//             className="image-preview"
//           />
//         )}

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
