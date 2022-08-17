import { TextField, Button, Grid, InputAdornment, CardActions, Box } from "@mui/material";
import React, { useImperativeHandle, useRef, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from "@mui/styles"
import CustomPopup from "./customPopup";
import CustomIconButton from "./customButtons/customIconButton";
const useStyles = makeStyles((theme) => ({
    ul: {
        display: "flex"
    },
    li: {
        width: "40px",
        fontSize: "14px",
        color: "#454545",
        height: "40px",
        backgroundColor: "#eee",
        marginRight: "20px",
        borderRadius: "3px",
        lineHeight: "40px",
        textAlign: "center",
        position: "relative",
        padding: "0px 20px"
    },
    cancel: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: 'red',
        backgroundColor: "#ddd",
        zIndex: 2
    }
}))

export default function ColorsHandler(props) {
    let classes = useStyles();
    let [colors, setColors] = useState([]);

    let colorInput = useRef();
    let sizeInput = useRef();
    let quantityInput = useRef();

    useImperativeHandle(props._ref, () => ({
        getColors: () => { }
    }))

    const addColor = () => {
        if (colorInput.current.value === "")
            return;

        setColors([...colors, colorInput.current.value])
        props.sendColors && props.sendColors([...colors, colorInput.current.value]);
        colorInput.current.value = "";
    }

    const deletColor = (deletIndex) => {
        let newColors = colors.filter((color, index) => index !== deletIndex)
        setColors(newColors)
    }

    let colorsChoosed = colors.map((color, index) => {
        return <li key={index} className={classes.li}>
            <span>{color}</span>
            <HighlightOffIcon onClick={() => deletColor(index)} className={classes.cancel} />
        </li>;
    })
    // let onChangeHandler = e => {
    //     let inputValue = e.target.value;
    //     let indexInArray = e.target.index;
    //     let propertyName = e.target.property;
    //     let getAllColors = 
    // }
    return <>
        <Grid container spacing={3}>
            <Grid item md={3} >
                <TextField
                    fullWidth
                    label="With normal TextField"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item md={3}>
                <TextField
                    fullWidth

                    label="With normal TextField"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item md={3}>
                <TextField
                    fullWidth

                    label="With normal TextField"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item md={3} display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" sx={{ marginRight: 2 }}>save</Button>
                <Button variant="contained" color="error">delete</Button>
            </Grid>
        </Grid>
        <Box marginTop={3} textAlign="center">
            <CustomIconButton action={() => console.log("add button")} />
        </Box>
        {!props.nullPreview ? <ul style={{ listStyle: "none" }} className={classes.ul}>
            {colorsChoosed}
        </ul> : null}

    </>;
}
