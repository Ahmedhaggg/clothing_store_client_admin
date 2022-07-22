import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Cookies, useCookies } from "react-cookie";

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;
        console.log(data)
        try {
            let sendLogin = await fetch(
                `${process.env.REACT_APP_APIURL}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )
            let loginResult = await sendLogin.json();

            if (loginResult.success === false)
                return rejectWithValue(loginResult);
            localStorage.setItem("token", loginResult.token)
            return loginResult.token;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
)

const slice = createSlice({
    name: "auth",
    initialState: { token: localStorage.getItem("token") || null, isLoading: false, validationErrors: null },
    reducers: {
        logout: (state) => {
            state.token = null
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            console.log("pending", state)
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.validationErrors = null;
            state.token = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.validationErrors = action.payload.validationErrors || action.payload.message;
        }

    }

})

export const { logout } = slice.actions;

export default slice.reducer;