import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory, resetCategoryIsUpdated, updateCategory } from "../../store/categories";
import { Alert, Button, TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from "../../components/pageHeader";




export default function EditCategory() {
    let { id } = useParams();
    let dispatch = useDispatch();
    let { isLoading, category, categoryIsUpdated } = useSelector(state => state.categories);
    let { control, handleSubmit, formState: { errors }, setValue } = useForm();
    let [updateError, setUpdateError] = useState(null)

    useEffect(() => {
        dispatch(resetCategoryIsUpdated())
    }, [])

    useEffect(() => {
        if (!category || category.id != id)
            dispatch(getCategory({ categoryId: id }))

    }, [dispatch, id, category])

    useEffect(() => {
        setValue("name", category ? category.name : "")
    }, [category, setValue])

    let submitHandler = (data) => {
        if (data.name !== category.name) {
            dispatch(updateCategory({ categoryId: id, newCategoryData: data }))
            setUpdateError(null);
        } else {
            dispatch(resetCategoryIsUpdated())
            setUpdateError({ name: "category name is old" });
        }
    }

    return (
        isLoading ? "loading" :
            <Box>
                <PageHeader text="Edit category" />
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
                        updateError && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>{updateError.name}</Alert>
                        )
                    }
                    <Box textAlign='center'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size='large'
                        >
                            update category
                        </Button>
                        {categoryIsUpdated && <Box marginTop={3}><Alert severity="success" >{categoryIsUpdated.message}</Alert></Box>}
                    </Box>
                </form>
            </Box>
    );
}
