import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const categorySlice = createApi({
    reducerPath: "categoriesSlice",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2000/api/admin/" }),
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => {
                return {
                    url: "categories",
                    method: "GET",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
            }
        }),
        getCategoryById: builder.query({
            query: (id) => {
                return {
                    url: `categories/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
            }
        }),
        getCategory: builder.mutation({
            query: (id) => {
                console.log(id)
                return {
                    url: `categories/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
            }
        }),
        createProduct: builder.mutation({
            query: newProductData => {
                console.log(newProductData)
                return ({
                    method: "POST",
                    url: "products",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(newProductData)
                })
            }
        })
    })
});
// useGetAllProductsMutation

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery, useGetCategoryMutation, useCreateProductMutation } = categorySlice;
