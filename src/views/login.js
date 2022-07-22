import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { login } from "../store/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
    const { validationErrors, token } = useSelector(state => state.auth);
    let { control, handleSubmit, formState: { errors } } = useForm();
    let dispatch = useDispatch();

    let submitHandler = (data) => {
        dispatch(login(data));

    }

    useEffect(() => {
        console.log(token)
    }, [token])

    return token ?
        <Navigate to="/dashboard" replace={true} />
        :
        (<Grid container direction="column" spacing={5} justifyContent="center" alignContent="center" sx={{ minHeight: "100vh" }}>
            <Grid item>
                <Typography variant='h4' color="primary" textAlign="center">Login</Typography>
            </Grid>
            <Grid item>
                <form onSubmit={handleSubmit(submitHandler)} style={{ justifyContent: "center" }}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                            <TextField
                                type="email"
                                variant="outlined"
                                fullWidth
                                label="email"
                                error={Boolean(errors.email)}
                                sx={{ marginBottom: 2 }}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 8,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.password)}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    {
                        validationErrors && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>{validationErrors}</Alert>
                        )
                    }
                    <Box textAlign='center'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size='large'
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>)


}
