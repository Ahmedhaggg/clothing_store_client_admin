import React, { useRef, useState } from "react";
import { Grid, TextField, Button, InputAdornment, MenuItem, Select, InputLabel, FormControl, Alert, Box, Typography } from "@mui/material";
import { addColor, deleteColor } from "../../store/newProductDetailSlice"
import { useDispatch, useSelector } from "react-redux";


let sizes = ["3x", "2x", "xl", "lg", "sm", "md"];
export default function ColorsInputs() {
    let [item, setItem] = useState({
        color: "",
        quantity: "",
        size: ""
    });
    let dispatch = useDispatch();
    let parentInput = useRef()
    let [errors, setErrors] = useState({ color: false, size: false, quantity: false })
    let { productDetails } = useSelector(state => state.newProductDetails)
    let [save, setItemSave] = useState(false);
    let saveItem = (e) => {
        if (item.color === "" || item.quantity == "" || item.size == "") {
            setErrors({
                color: item.color === "",
                size: item.size === "",
                quantity: item.quantity === ""
            });
            return;
        }
        setItemSave(true);
        dispatch(addColor(item))
        e.target.remove();
    };

    let deleteItem = () => {
        if (Object.keys(item).length === 0 || productDetails.length <= 1)
            return;
        dispatch(deleteColor(item));
        parentInput.current.remove()
    }

    let handleChange = e => {
        console.log(e.target.value);
        setItem({ ...item, [e.target.name]: e.target.value });
        e.target.value !== "" ?
            setErrors({ ...errors, [e.target.name]: false })

            : setErrors({ ...errors, [e.target.name]: true });

    }
    return (
        <>
            <Grid container spacing={3} marginBottom={2} ref={parentInput} >
                <Grid item md={3} >
                    {!save ?

                        <TextField
                            name="color"
                            fullWidth
                            label="color"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">color</InputAdornment>
                            }}
                            error={Boolean(errors.color)}
                            onChange={handleChange}
                        />
                        : <Alert icon={false} severity="info">{item.color}</Alert>
                    }
                </Grid>
                <Grid item md={3}>
                    {!save ?
                        <FormControl
                            fullWidth
                            error={Boolean(errors.categoryId)}
                            sx={{ marginBottom: 2 }}
                        >
                            <InputLabel id="select-category">category</InputLabel>
                            <Select
                                name="size"
                                labelId="select-category"
                                id="demo-simple-select"
                                value={item.size || sizes[0]}
                                label="size"
                                onChange={handleChange}
                                error={Boolean(errors.size)}
                            >
                                {
                                    sizes.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        : <Alert icon={false} severity="info">{item.size}</Alert>
                    }

                </Grid>
                <Grid item md={3}>
                    {!save ?
                        <TextField
                            name="quantity"
                            fullWidth
                            type="number"
                            label="quantity"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">quantity</InputAdornment>
                            }}
                            error={Boolean(errors.quantity)}
                            onChange={handleChange}
                        />
                        : <Alert icon={false} severity="info">{item.quantity}</Alert>
                    }
                </Grid>

                <Grid item md={3}>
                    <Box minHeight="100%" display="flex" justifyContent="center" alignItems="center">
                        <Button variant="contained" sx={{ marginRight: 2 }} onClick={saveItem} >save</Button>
                        <Button variant="contained" color="error" onClick={deleteItem}>delete</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
