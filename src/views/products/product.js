import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetAllProductsQuery, useGetProductByIdQuery } from "../../store/productSlice";
import { makeStyles } from "@mui/styles"
let useClasses = makeStyles((theme) => {
    return {
        productContainer: {
            backgroundColor: theme.background.secondary
        },
        imageContainer: {
            width: 3,
            display: "flex",
            justifyContent: "center"
        },
        image: {
            width: "250px",
            height: "250px",
            display: "block"
        }
    }
})


export default function Product() {
    let classes = useClasses();
    let { id } = useParams()
    let { data, isLoading, isSuccess } = useGetProductByIdQuery(id);
    let [image, setImage] = useState(null)
    // http://localhost:2000/images/
    return <>
        {isLoading ? "loading ... " : (
            <>
                {
                    isSuccess ? (
                        <Box className={classes.productContainer}>
                            <Box className={classes.imageContainer}>
                                <img crossOrigin="anonymous" src={`${process.env.REACT_APP_PRODUCTIMAGES}${data.product.image}`} width="300" />
                            </Box>
                        </Box>
                    ) :
                        <Navigate to="/404" />
                }
            </>
        )}
    </>
}

