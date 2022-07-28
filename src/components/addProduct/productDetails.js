import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import ColorInputs from "./colorInputs"
import CustomIconButton from "../customButtons/customIconButton";
import ProductDetailsHeader from "./productDetailsHeader";



export default function ProductColorsHandler() {
    let [colorInputList, setColorInputList] = useState([<ColorInputs key={0} />])

    let addNewColorInputs =
        () => setColorInputList([
            ...colorInputList,
            < ColorInputs key={Math.random() * 10} />
        ]);


    return <>
        <Box paddingTop={3} >
            <Typography marginBottom={3} textAlign="center" variant="h4">
                Product details
            </Typography>
            <ProductDetailsHeader />
            <>{colorInputList}</>
            <Box marginTop={3} textAlign="center">
                <CustomIconButton action={addNewColorInputs} />
            </Box>
        </Box>
    </>
}



{/* <Grid container justifyContent="center" direction="row" >
                <Grid item md={4}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Photos" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={8} > */}
{/* <Grid container >
    <Grid item md={6} >
        <Typography>sizes</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemText primary="Photos" />
            </ListItem>
        </List>
    </Grid>
    <Grid item md={6}>
        <Typography>enter quantty</Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" type="number" size="small" />

    </Grid>
</Grid> */}
{/* </Grid>
            </Grid> */}
