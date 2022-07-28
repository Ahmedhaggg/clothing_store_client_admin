import React, { useEffect } from "react";
import { useGetAllProductsQuery } from "../../store/apiSlice";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from "@mui/styles";
import PageHeader from "../../components/pageHeader";
import CustomIconLinkButton from "../../components/customIconLinkButton";

let useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    }
}))

export default function Products() {
    let classes = useStyles()
    const { data, isLoading, isSuccess } = useGetAllProductsQuery();

    return <>
        {
            isLoading ? ("loading .....") : (
                <>
                    {
                        isSuccess ?
                            (
                                <>
                                    <PageHeader text="products" />

                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">id</TableCell>
                                                    <TableCell align="left">name</TableCell>
                                                    <TableCell align="left">show</TableCell>
                                                    <TableCell align="left">edit</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            {data.products.length > 0 ?
                                                <TableBody>
                                                    {data.products.map((product) => (
                                                        <TableRow
                                                            key={product.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="left">{product.id}</TableCell>
                                                            <TableCell align="left">{product.name}</TableCell>
                                                            <TableCell align="left">
                                                                <Link to={"/products/" + product.id} className={classes.link}>show</Link>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Link to={"/products/" + product.id + "/edit"} className={classes.link} >edit</Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                : null
                                            }
                                        </Table>
                                    </TableContainer >
                                </>
                            ) : (
                                <Navigate to="/505" />
                            )
                    }
                </>
            )
        }
        <CustomIconLinkButton link="/products/create" />
    </>
}
