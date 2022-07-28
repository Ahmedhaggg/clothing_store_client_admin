import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetAllProductsQuery, useGetProductByIdQuery } from "../../store/apiSlice";

export default function Product() {
    let { id } = useParams()
    let { data, isLoading, isSuccess } = useGetProductByIdQuery(id)
    // let { product } = data;
    // let data = useGetProductByIdQuery(id)
    console.log(data);
    console.log(isSuccess)
    return <>
        {isLoading ? "loading ... " : (
            <>
                {
                    !isSuccess ? <Navigate to="/404" /> : <div>{data.product.name}</div>
                }
            </>
        )}
    </>
}
