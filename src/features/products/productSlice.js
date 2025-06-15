// src/features/products/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedProducts = localStorage.getItem('products');
const initialState = {
  products: savedProducts ? JSON.parse(savedProducts) : [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  addProduct: (state, action) => {
    state.products.push(action.payload);
    localStorage.setItem('products', JSON.stringify(state.products));
  },
  deleteProduct: (state, action) => {
    state.products = state.products.filter(p => p.id !== action.payload);
    localStorage.setItem('products', JSON.stringify(state.products));
  },
  toggleFavorite: (state, action) => {
    const product = state.products.find(p => p.id === action.payload);
    if (product) {
      product.favorite = !product.favorite;
    }
    localStorage.setItem('products', JSON.stringify(state.products));
  },
  updateProduct: (state, action) => {
    const index = state.products.findIndex(p => p.id === action.payload.id);
    if (index !== -1) {
      state.products[index] = { ...state.products[index], ...action.payload };
    }
    localStorage.setItem('products', JSON.stringify(state.products));
  },
},
});

export const {
  addProduct,
  deleteProduct,
  toggleFavorite,
  updateProduct,
} = productSlice.actions;

export default productSlice.reducer;


// import { createSlice, nanoid } from '@reduxjs/toolkit';

// const initialState = {
//   products: [],
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     addProduct: {
//       reducer: (state, action) => {
//         state.products.push(action.payload);
//       },
//       prepare: (product) => {
//         return {
//           payload: {
//             id: nanoid(),
//             ...product,
//             favorite: false,
//           },
//         };
//       },
//     },
//     updateProduct: (state, action) => {
//         const index = state.products.findIndex(p => p.id === action.payload.id);
//         if (index !== -1) {
//             state.products[index] = { ...state.products[index], ...action.payload };
//         }
//     },
//     deleteProduct: (state, action) => {
//         state.products = state.products.filter(p => p.id !== action.payload);
//     },
//     toggleFavorite: (state, action) => {
//         const product = state.products.find(p => p.id === action.payload);
//         if (product) {
//             product.favorite = !product.favorite;
//         }
//     },
//   },
// });

// export const {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   toggleFavorite,
// } = productSlice.actions;

// export default productSlice.reducer; // ← THIS LINE is required
