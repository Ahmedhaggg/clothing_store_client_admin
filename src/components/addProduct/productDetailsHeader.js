import React from "react";
import { Grid, Typography } from "@mui/material"
export default function ProductDetailsHeader() {
    return <>
        <Grid container spacing={3} marginBottom={2}>
            <Grid item md={3} textAlign="center" >
                <Typography bgcolor="primary.main" paddingTop={2} paddingBottom={2} color="white" >color</Typography>
            </Grid>
            <Grid item md={3} textAlign="center" >
                <Typography bgcolor="primary.main" paddingTop={2} paddingBottom={2} color="white" >size</Typography>
            </Grid>
            <Grid item md={3} textAlign="center" >
                <Typography bgcolor="primary.main" paddingTop={2} paddingBottom={2} color="white" >quantity</Typography>
            </Grid>
            <Grid item md={3} textAlign="center" >
                <Typography bgcolor="primary.main" paddingTop={2} paddingBottom={2} color="white" >actions</Typography>
            </Grid>
        </Grid>
    </>;
}
