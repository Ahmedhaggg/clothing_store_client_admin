import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth";
import categoryReducer from "./categories";
import { productSlice } from "./apiSlice"
import { categorySlice } from "./categoriesSlice";
import newProductDetailsReducer from "./newProduct"

const Store = configureStore({

    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        [productSlice.reducerPath]: productSlice.reducer,
        [categorySlice.reducerPath]: categorySlice.reducer,
        newProductDetails: newProductDetailsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productSlice.middleware),
})

export default Store;