import React, { useEffect, useState } from "react";
import { useCreateProductMutation } from "../../store/apiSlice";
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, Alert } from "@mui/material"
import PageHeader from "../../components/pageHeader";
import { Controller, useForm } from 'react-hook-form';
import ImagePreview from "../../components/imagePreview";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomPopup from "../../components/customPopup";
import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "../../store/categoriesSlice";
import { skipToken } from '@reduxjs/toolkit/query'
import ProductDetailsHandler from "../../components/addProduct/productDetails";
import { Navigate } from "react-router-dom";


// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function CreateProduct() {
    let { control, handleSubmit, formState: { errors }, setValue } = useForm();
    let { productDetails } = useSelector(state => state.newProductDetails)
    let [image, setImage] = useState(null);
    let [containDiscount, changeContainDiscount] = useState(false)
    let [selectedCategory, setSelectedCategory] = useState(null)
    let categories = useGetAllCategoriesQuery();
    let category = useGetCategoryByIdQuery(selectedCategory ?? skipToken);
    let [createProduct, { isError, isSuccess, error }] = useCreateProductMutation();
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        if (isSuccess == true)
            setTimeout(() => {
                setSuccess(true)
            }, 1500)
    }, [isSuccess])

    console.log(error)
    let submitHandler = (data) => {
        console.log(data)
        console.log(containDiscount)
        containDiscount ? createProduct({
            productDetails,
            image,
            name: data.name,
            price: data.price,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId,
            description: data.description,
            discount: {
                expiresin: data.discountExpiresin,
                description: data.discountDescription,
                percent: data.discountPercent
            }
        }) : createProduct({ ...data, productDetails, image });
    }

    return <>

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

            <Controller
                name="price"
                defaultValue=""
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={Boolean(errors.price)}
                        sx={{ marginBottom: 2 }}
                        {...field}
                    ></TextField>
                )}
            ></Controller>

            {
                categories?.data?.categories && categories?.data?.categories.length > 0 ?

                    <FormControl
                        fullWidth
                        error={Boolean(errors.categoryId)}
                        sx={{ marginBottom: 2 }}

                    >
                        <InputLabel id="select-category">category</InputLabel>
                        <Controller
                            name="categoryId"
                            control={control}
                            defaultValue={categories.data.categories[0].name}
                            rules={{
                                required: true
                            }}
                            render={({ field }) => (
                                <Select
                                    name={field.name}
                                    labelId="select-category"
                                    id="demo-simple-select"
                                    value={field.value}
                                    label={field.name}
                                    error={Boolean(errors.categoryId)}
                                    {...field}
                                >
                                    {
                                        categories.data.categories.map(categoryData => <MenuItem key={categoryData.id} value={categoryData.id} onClick={(e) => {
                                            setSelectedCategory(categoryData.id)
                                        }} >{categoryData.name}</MenuItem>)
                                    }
                                </Select>
                            )}
                        ></Controller>
                    </FormControl>
                    :
                    <Alert severity="error" sx={{ marginBottom: 2 }}>not match categories to add product</Alert>

            }

            {selectedCategory && (
                category?.data?.category?.subcategories && category?.data?.category?.subcategories.length > 0 ?
                    <FormControl
                        fullWidth
                        error={Boolean(errors.subcategoryId)}
                        sx={{ marginBottom: 2 }}

                    >
                        <>
                            <InputLabel id="select-subcategory">subcategory</InputLabel>
                            <Controller
                                name="subcategoryId"
                                defaultValue={category.data.category.subcategories[0].name}
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <Select
                                        labelId="select-subcategory"
                                        id="demo-simple-select"
                                        value={field.value}
                                        label={field.name}
                                        error={Boolean(errors.subcategoryId)}
                                        {...field}
                                    >
                                        {
                                            category.data.category.subcategories.map((subcategory, index) => <MenuItem value={subcategory.id} key={index}>{subcategory.name}</MenuItem>)
                                        }
                                    </Select>
                                )}
                            ></Controller>
                        </>

                    </FormControl>
                    : <Alert severity="error" sx={{ marginBottom: 2 }} >category does't have subcategories</Alert>
            )}

            <Controller
                name="description"
                defaultValue=""
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                        label="description"
                        error={Boolean(errors.description)}
                        sx={{ marginBottom: 2, resize: "both" }}
                        {...field}
                    ></TextField>
                )}
            ></Controller>

            <Controller
                name="image"
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <Button variant="contained" component="label" sx={{ resize: "both", marginBottom: 2 }} {...field}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                    </Button>
                )}
            ></Controller>

            {image && <Box>
                <ImagePreview src={image} title="product image" />
            </Box>}

            {Boolean(errors.image) && <Alert severity="error">please select image</Alert>}

            <Box marginTop={2} >
                <ProductDetailsHandler />
            </Box>

            {containDiscount &&
                <Box marginTop={3}>
                    <Controller
                        name="discountPercent"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="percent"
                                error={Boolean(errors.discountPercent)}
                                sx={{ marginBottom: 2, resize: "both" }}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    <Controller
                        name="discountDescription"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <TextField
                                multiline
                                rows={2}
                                variant="outlined"
                                fullWidth
                                label="discount description"
                                error={Boolean(errors.discountDescription)}
                                sx={{ marginBottom: 2, resize: "both" }}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            name="discountExpiresin"
                            defaultValue=""
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <DateTimePicker
                                        label="Date&Time picker"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}

                                        renderInput={(params) => <TextField {...params} error={Boolean(errors.discountExpiresin)} fullWidth ></TextField>}
                                    />
                                </>

                            )}
                        ></Controller>
                    </LocalizationProvider>
                </Box>
            }

            <CustomPopup question="do you wan't to add discount with product" agreeAction={() => changeContainDiscount(true)} disAgreeAction={() => changeContainDiscount(false)} />

            {
                isSuccess === true ?
                    <Alert severity="success" sx={{ marginBottom: 2, marginTop: 2 }}>product is added successfully</Alert>
                    :
                    isError === true && error?.data?.errorName === "validationError" ?
                        <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>{error.data.validationErrors[0].param.replace(".", " ")} {error.data.validationErrors[0].msg}</Alert>
                        : isError === true ?
                            <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>{error.data.message}</Alert>
                            : null
            }
            {success && <Navigate to="/products" />}
            <Box textAlign='center' marginBottom={5} marginTop={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='large'
                >
                    add new product
                </Button>
            </Box>

        </form >

    </>
}