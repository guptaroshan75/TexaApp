import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";

interface UserRegistrationData {
    name: string;
    email: string;
    password: string;
    country_id: number | null;
}

interface UserLoginData {
    password: string;
    email: string;
}

export const registerUser = createAsyncThunk("Auth/registerUser",
    async (userObj: UserRegistrationData) => {
        try {
            const response = await axios.post(`${Api}/registered`, userObj);
            return response.data;
        } catch (error) {
            return error
        }
    }
);

export const loginUser = createAsyncThunk("Auth/loginUser",
    async (userObj: UserLoginData) => {
        try {
            const response = await axios.post(`${Api}/login`, userObj);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return error
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        token: null as any,
        user: null as any,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.token = payload.token;
                state.user = payload;
            })
            .addCase(loginUser.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.token = payload.token;
                state.user = payload;
            })
    },
});

export default authSlice.reducer;
