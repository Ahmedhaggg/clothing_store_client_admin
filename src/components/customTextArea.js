import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    },
    textarea: {
        resize: "both"
    }
}));

export default function CustomTextArea(props) {
    const classes = useStyles();

    return (
        <TextField
            // id="outlined-textarea"
            // label="Multiline Placeholder"
            // multiline
            // variant="outlined"
            inputProps={{ className: classes.textarea }}
            {...props}
        ></TextField>
    );
}