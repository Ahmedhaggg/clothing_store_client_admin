import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../store/categories";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import PageHeader from "../../components/pageHeader";
import AddIcon from '@mui/icons-material/Add';

let useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    },

}))

export default function Categories() {
    let classes = useStyles()
    let { categories, isLoading } = useSelector(state => state.categories);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);
    useEffect(() => {
        console.log(categories)
    }, [categories]);
    return (
        <Box>
            {
                isLoading ? ("loading .....") : (
                    <Box>
                        <Box>
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
                                    <TableBody>
                                        {categories.map((category) => (

                                            <TableRow
                                                key={category.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{category.id}</TableCell>
                                                <TableCell align="left">{category.name}</TableCell>
                                                <TableCell align="left">
                                                    <Link to={"/categories/" + category.id} className={classes.link}>show</Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link to={"/categories/" + category.id + "/edit"} className={classes.link} >edit</Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer >
                        </Box>
                    </Box>
                )
            }
            <IconButton variant='contained'
                sx={{ position: "fixed", width: "50px", height: "50px", fontSize: "25px", bottom: "5%", right: 0, zIndex: 2000, bgcolor: "primary.main", ":hover": { bgcolor: "primary.light" } }}>
                <Link to="/categories/create">
                    <AddIcon sx={{ color: "white", fontSize: "25px" }} />
                </Link>
            </IconButton>
            {/* <Box bgcolor="red" width="40px" height="40px" position="absolute" top="0" right="0">
                color
            </Box>
            <Box marginTop={4} textAlign="center" position="relative">
                <Box bgcolor="red" width="40px" height="40px" position="absolute" top="0" right="0">
                    color
                </Box>
                {/* <Button size="medium">
                    <Link to="/categories/create" className="linkButton">
                        add new category
                    </Link>
                </Button> */}
            {/* </Box> * /} */}
        </Box >
    );
}
