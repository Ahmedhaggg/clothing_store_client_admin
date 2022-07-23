import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCategory, resetCategoryIsAdded, resetCreateCategoryError } from "../../store/categories";
import { Alert, Button, TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from "../../components/pageHeader";

export default function CreateCategory() {
    let dispatch = useDispatch();
    let { createCategoryError, categoryIsAdded } = useSelector(state => state.categories);
    let { control, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        dispatch(resetCategoryIsAdded())
        dispatch(resetCreateCategoryError())
    }, [])

    let submitHandler = (data) => {
        dispatch(resetCategoryIsAdded())
        dispatch(resetCreateCategoryError())
        dispatch(createCategory(data));
    }

    return <Box>
        <PageHeader text="create category" />
        <form onSubmit={handleSubmit(submitHandler)} style={{ justifyContent: "center" }}>
            <Controller
                name="name"
                defaultValue=""
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="name"
                        error={Boolean(errors.name)}
                        sx={{ marginBottom: 2 }}
                        {...field}
                    ></TextField>
                )}
            ></Controller>
            {
                createCategoryError && createCategoryError.type === "duplicated" &&
                <Alert severity="error" sx={{ marginBottom: 2 }}>name is used in another category</Alert>
            }
            {
                createCategoryError && createCategoryError.type === "validation" &&
                <Alert severity="error" sx={{ marginBottom: 2 }}>name is required</Alert>
            }
            <Box textAlign='center'>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='large'
                >
                    create category
                </Button>
                {categoryIsAdded && <Box marginTop={3}><Alert severity="success" >{categoryIsAdded.message}</Alert></Box>}

            </Box>

        </form>
    </Box>;
}
