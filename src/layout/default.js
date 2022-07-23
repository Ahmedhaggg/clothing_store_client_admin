import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";


export default function Layout({ children }) {
    let { token } = useSelector(state => state.auth);
    let [sideBarMode, toogleSideBar] = React.useState(true);
    const openSideBar = () => {
        console.log("sideBarMode")
        toogleSideBar(!sideBarMode)
    };

    return token ?
        <>
            <NavBar openSideBar={openSideBar} />
            <Grid container spacing={3} direction="row" justifyContent={!sideBarMode ? "center" : "start"} >
                {sideBarMode && <Grid item md={3}>
                    <Sidebar />
                </Grid>}

                <Grid item md={sideBarMode === true ? 9 : 10}>
                    <Box paddingTop="100px">
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>

        </> :
        <Navigate to="/login" replace={true} />

} 