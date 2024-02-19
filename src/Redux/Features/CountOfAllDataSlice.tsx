import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Count {
    isLoading: boolean;
    allCount: {
        shop: '', equipment: '', dosage: '', query: '',
    };
}

const initialState: Count = {
    isLoading: false,
    allCount: {
        shop: '', equipment: '', dosage: '', query: '',
    },
};

export const getAllCount = createAsyncThunk("get_all_Count",
    async (userId: string, { rejectWithValue }) => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
                Authorization: `Bearer ${token}`,
        }
        try {
            const response = await axios.get(`${Api}/get_count/${userId}`, { headers });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const CountOfAllDataSlice = createSlice({
    name: "CountOfAllData_Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCount.pending, (state: Count) => {
                state.isLoading = true;
            })
            .addCase(getAllCount.fulfilled, (state: Count, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.allCount = action.payload;
            })
    },
});

export default CountOfAllDataSlice.reducer;