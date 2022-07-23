import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "../httpRequests/http"

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;
        let response = await request.get("/categories", localStorage.getItem("token"));

        if (response.success === false)
            return rejectWithValue(response.message);

        return response.categories;
    }
)

export const getCategory = createAsyncThunk(
    "categories/getCategory/",
    async (data, thunkApi) => {

        let { rejectWithValue } = thunkApi;
        let response = await request.get("/categories/" + data.categoryId, localStorage.getItem("token"));

        if (response.success === false)
            return rejectWithValue(response.message);

        return response.category;
    }
)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;

        let response = await request.put("/categories/" + data.categoryId, localStorage.getItem("token"), data.newCategoryData);

        if (response.success === false)
            return rejectWithValue(response);

        return {
            categoryId: data.categoryId,
            newCategoryName: response.name,
            newCategorySlug: response.slug
        }
    }
)

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;

        let response = await request.post("/categories", localStorage.getItem("token"), data);

        if (response.success === false)
            return rejectWithValue(response);

        return response.newCategory;
    }
)

const slice = createSlice({
    name: "categories",
    initialState: { categories: [], createCategoryError: null, isLoading: false, category: null, categoryIsAdded: null, categoryIsUpdated: null },
    reducers: {
        resetCreateCategoryError: (state) => {
            state.createCategoryError = null;
        },
        resetCategoryIsAdded: (state) => {
            state.categoryIsAdded = null;
        },
        resetCategoryIsUpdated: (state) => {
            state.categoryIsUpdated = null;
        }
    },
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [getCategory.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
            console.log(state.category, "category")
            state.isLoading = false;
            state.category = action.payload;
        },
        [getCategory.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [updateCategory.pending]: (state, action) => {
            console.log("pending")
            state.isLoading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (state.category.id === parseInt(action.payload.categoryId))
                state.category.name = action.payload.newCategoryName;
            let newCategories = state.categories.map(
                category => category.id === action.payload.categoryId ?
                    {
                        ...category,
                        name: action.payload.newCategoryName,
                        slug: action.payload.newCategorySlug
                    } : category
            )
            state.categories = newCategories;
            state.categoryIsUpdated = {
                success: true,
                message: "category is updated successfully"
            };
        },
        [updateCategory.rejected]: (state, action) => {
            console.log("rejected")
            state.isLoading = false;
        },
        [createCategory.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categories.push(action.payload);
            state.categoryIsAdded = {
                success: true,
                message: "category is created successfully"
            };
        },
        [createCategory.rejected]: (state, action) => {
            state.isLoading = false;
            if (action.payload.errorName === "duplicateFields")
                state.createCategoryError = { type: "duplicated", fields: action.payload.fields };
            if (action.payload.errorName === "validationError")
                state.createCategoryError = { type: "validation", fields: action.payload.validationErrors };
        }
    }

})

export const { resetCategoryIsAdded, resetCategoryIsUpdated, resetCreateCategoryError } = slice.actions;


export default slice.reducer;