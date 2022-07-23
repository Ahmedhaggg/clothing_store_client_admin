import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth";
import categoryReducer from "./categories";

const Store = configureStore({

    reducer: {
        auth: authReducer,
        categories: categoryReducer
    }
})

export default Store;