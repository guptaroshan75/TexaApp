import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";

interface CountryState {
    isLoading: boolean;
    allCountry: any[];
}

const initialState: CountryState = {
    isLoading: false,
    allCountry: [],
};

export const getAllCountry = createAsyncThunk("get_all_country", async () => {
    try {
        const response = await axios.get(`${Api}/countrys`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const AllCountrySlice = createSlice({
    name: "AllCountrySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCountry.pending, (state: CountryState) => {
                state.isLoading = true;
            })
            .addCase(getAllCountry.fulfilled, (state: CountryState, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.allCountry = action.payload.data;
            })
    },
});

export default AllCountrySlice.reducer;