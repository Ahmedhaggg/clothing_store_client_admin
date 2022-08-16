import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const productSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2000/api/admin/" }),
    // tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => {
                return {
                    url: "products",
                    method: "GET",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
            },
            // providesTags: ["Product"]
        }),
        getProductById: builder.query({
            query: (id) => {
                return {
                    url: `products/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
            }
        }),
        createProduct: builder.mutation({
            query: newProductData => {
                let formData = new FormData();
                formData.append("name", newProductData.name)
                formData.append("price", newProductData.price)
                formData.append("categoryId", newProductData.categoryId)
                formData.append("subcategoryId", newProductData.subcategoryId)
                formData.append("description", newProductData.description)
                formData.append("image", newProductData.image)
                if (newProductData.discount) {
                    formData.append("discount[expiresin]", newProductData.discount.expiresin)
                    formData.append("discount[percent]", newProductData.discount.percent)
                    formData.append("discount[description]", newProductData.discount.description)
                }
                newProductData.productDetails.forEach((productDetail, index) => {
                    formData.append(`productDetails[${index}][color]`, newProductData.productDetails[index].color);
                    productDetail.sizes.forEach((size, i) => {
                        formData.append(`productDetails[${index}][sizes][${i}][size]`, size.size);
                        formData.append(`productDetails[${index}][sizes][${i}][quantity]`, size.quantity);
                    });
                })
                return ({
                    method: "POST",
                    url: "products",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    },
                    body: formData
                })
            }
        })
        // getAllProducts: builder.mutation({
        //     query: () => {
        //         return {
        //             url: "products",
        //             method: "GET",
        //             headers: {
        //                 'authorization': localStorage.getItem("token")
        //             }
        //         }
        //     }
        //     // providesTags: [{ type: "products", id: "list" }]
        // })
    })
});
// useGetAllProductsMutation

export const { useGetAllProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productSlice;
