import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getCategory } from "../../store/categories";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import PageHeader from "../../components/pageHeader";


let useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    }
}))


export default function Category() {
    let classes = useStyles()
    let { id } = useParams();
    let { isLoading, category, categoryIsUpdated } = useSelector(state => state.categories);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory({ categoryId: id }))
    }, [dispatch]);

    return (
        <Box>
            {
                isLoading ? ("loading .....") : (
                    <>
                        <PageHeader text="categories" />

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
                                {category && category.subcategories.length > 0 ?
                                    <TableBody>
                                        {category.subcategories.map((subcategory) => (
                                            <TableRow
                                                key={subcategory.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{subcategory.id}</TableCell>
                                                <TableCell align="left">{subcategory.name}</TableCell>
                                                <TableCell align="left">
                                                    <Link to={"/subcategories/" + subcategory.id} className={classes.link}>show</Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link to={"/subcategories/" + subcategory.id + "/edit"} className={classes.link} >edit</Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    : null
                                }
                            </Table>
                            {category && category.subcategories.length === 0 ? <Box textAlign="center" padding={3}>category not matches subcategories</Box> : null}
                        </TableContainer >
                    </>
                )
            }
        </Box>
    );
}
