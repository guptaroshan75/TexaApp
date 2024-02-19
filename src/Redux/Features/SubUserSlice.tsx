import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Sub_User {
    isLoading: boolean;
    get_subUser: any[],
}

const initialState: Sub_User = {
    isLoading: false,
    get_subUser: [],
};

export const getAllSubUSer = createAsyncThunk("get_all_SubUSer", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get_subUser/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteSubUser = createAsyncThunk("delete-SubUser", async (subUserId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${Api}/delete-subUser/${subUserId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const SubUserSlice = createSlice({
    name: "SubUser_Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubUSer.pending, (state: Sub_User) => {
                state.isLoading = true;
            })
            .addCase(getAllSubUSer.fulfilled, (state: Sub_User, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_subUser = action.payload;
            })
            .addCase(deleteSubUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_subUser = state.get_subUser.filter(subUser => subUser.id !== payload);
            })
    },
});

export default SubUserSlice.reducer;