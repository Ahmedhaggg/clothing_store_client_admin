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
        toogleSideBar(!sideBarMode)
    };

    return token ?
        <>
            <NavBar openSideBar={openSideBar} />
            <Grid container direction="row" justifyContent={!sideBarMode ? "center" : "start"} >
                {sideBarMode && <Grid item md={3}>
                    <Sidebar />
                </Grid>}

                <Grid item md={sideBarMode === true ? 9 : 10}>

                    <Grid item paddingTop="100px" xs={10} margin="0px auto" >
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>

        </> :
        <Navigate to="/login" replace={true} />

} 