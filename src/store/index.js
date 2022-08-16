import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice";
import categoryReducer from "./categories";
import { productSlice } from "./productSlice"
import { categorySlice } from "./categorySlice";
import newProductDetailsReducer from "./newProductDetailSlice"

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