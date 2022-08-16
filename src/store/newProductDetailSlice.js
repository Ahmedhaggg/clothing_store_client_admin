import { createSlice } from "@reduxjs/toolkit";

const newProductDetailsSlice = createSlice({
    name: "newProductDetails",
    initialState: { productDetails: [] },
    reducers: {
        addColor: (state, action) => {
            let findColorIndex = state.productDetails.findIndex(productDetail => productDetail.color === action.payload.color)
            if (findColorIndex !== -1) {
                state.productDetails[findColorIndex].sizes.push({ size: action.payload.size, quantity: action.payload.quantity })
            } else {
                state.productDetails.push({
                    color: action.payload.color,
                    sizes: [{ size: action.payload.size, quantity: action.payload.quantity }]
                })
            }
        },
        deleteColor: (state, action) => {
            let findColorIndex = state.productDetails.findIndex(productDetail => productDetail.color === action.payload.color)
            let updatedSizes = state.productDetails[findColorIndex].sizes.map(size => {
                console.log(size);
                if (size.size !== action.payload.size)
                    return size;
            })
            state.productDetails[findColorIndex].sizes = updatedSizes;
        }
    }
});

export const { addColor, deleteColor } = newProductDetailsSlice.actions;

export default newProductDetailsSlice.reducer;