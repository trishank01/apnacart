import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      const tempProduct = products.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
        );
      });
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_OPTION: (state, action) => {
      const { products, sort } = action.payload;
      let sortPrice = [];
      if (sort === "latest") {
        sortPrice = products;
      }
      if (sort === "lowest-price") {
        sortPrice = products
          .map((item) => item)
          .sort((a, b) => {
            return a.price - b.price;
          });
      }

      if (sort === "highest-price") {
        sortPrice = products
          .map((item) => item)
          .sort((a, b) => {
            return b.price - a.price;
          });
      }

      if (sort === "a-z") {
        sortPrice = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        sortPrice = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = sortPrice;
    },
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === "All") {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_BRAND: (state, action) => {
        const { products, brand } = action.payload;
        let tempProduct = [];
        if (brand === "All") {
          tempProduct = products;
        } else {
          tempProduct = products.filter(
            (product) => product.brand === brand
          );
        }
        state.filteredProducts = tempProduct;
      },
    FILTER_BY_PRICE : (state , action) => {
       const {products , price} = action.payload
       let tempProduct = []
       tempProduct = products.filter((product) => product.price <= price)
       state.filteredProducts = tempProduct
    }
  },

});

export const { FILTER_BY_SEARCH, FILTER_BY_OPTION, FILTER_BY_CATEGORY , FILTER_BY_BRAND , FILTER_BY_PRICE} =
  filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
