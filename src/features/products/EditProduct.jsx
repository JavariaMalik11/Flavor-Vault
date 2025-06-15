// src/features/products/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from './productSlice';
import './AddProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productToEdit = useSelector(state =>
    state.products.products.find(p => p.id === Number(id))
  );

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [fileDataUrl, setFileDataUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        image: productToEdit.image.startsWith('data:')
          ? ''
          : productToEdit.image,
      });

      if (productToEdit.image.startsWith('data:')) {
        setFileDataUrl(productToEdit.image);
      }
    }
  }, [productToEdit]);

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
      setProduct({ ...product, image: '' });
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
      updateProduct({
        ...product,
        id: Number(id),
        image: fileDataUrl || product.image,
      })
    );
    navigate('/');
  };

  if (!productToEdit) {
    return <p style={{ color: 'white' }}>Product not found.</p>;
  }

  return (
  <div className="add-product-page">
    <div className="add-header">
      <h1 className="site-title">Flavor Vault</h1>
    </div>

    <div className="add-product-box">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          required
          value={product.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          required
          value={product.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          required
          value={product.price}
          onChange={handleChange}
        />
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

        <button type="submit">Update Product</button>
      </form>

      <Link to="/" className="home-button" title="Back to Home">🏠</Link>
    </div>
  </div>
);
}
export default EditProduct;

// // src/features/products/EditProduct.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { updateProduct } from './productSlice';
// import './AddProduct.css'; // Reuse the same CSS from AddProduct

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const product = useSelector(state =>
//     state.products.products.find(p => p.id === Number(id))
//   );

//   const [updated, setUpdated] = useState({
//     name: '',
//     description: '',
//     price: '',
//   });
//   const [imageUrl, setImageUrl] = useState('');
//   const [fileDataUrl, setFileDataUrl] = useState('');

//   useEffect(() => {
//     if (product) {
//       setUpdated({
//         name: product.name,
//         description: product.description,
//         price: product.price,
//       });

//       if (product.image?.startsWith('data:')) {
//         setFileDataUrl(product.image);
//       } else {
//         setImageUrl(product.image || '');
//       }
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'name') {
//       const isValid = /^[a-zA-Z\s'-]*$/.test(value); // allows hyphen, apostrophe
//       if (!isValid) return;
//     }

//     if (name === 'price' && Number(value) < 0) return;

//     setUpdated(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const nameIsValid = /^[a-zA-Z\s'-]+$/.test(updated.name);
//     if (!nameIsValid) {
//       alert('Product name can only contain letters, spaces, hyphens or apostrophes.');
//       return;
//     }

//     const updatedImage = fileDataUrl || imageUrl;

//     dispatch(updateProduct({
//       ...updated,
//       image: updatedImage,
//       id: Number(id),
//     }));

//     navigate('/');
//   };

//   if (!product) return <p style={{ padding: '1rem', color: '#fff' }}>Product not found.</p>;

//   return (
//     <div className="add-product-container">
//       <h2>Edit Product</h2>
//       <form className="product-form" onSubmit={handleSubmit}>
//         <input
//           name="name"
//           value={updated.name}
//           placeholder="Product Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="description"
//           value={updated.description}
//           placeholder="Description"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="price"
//           value={updated.price}
//           type="number"
//           placeholder="Price"
//           onChange={handleChange}
//           required
//         />
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
//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;