import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Application {
    isLoading: boolean;
    applications: any[];
}

const initialState: Application = {
    isLoading: false,
    applications: [],
};

export const getAllApplication = createAsyncThunk("get_all_application", async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get_application`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// export const addShop = createAsyncThunk("User/add-shop",
//     async ({ user_id, token, shopData }: { user_id: number; token: string; shopData: AddShopData },
//         { rejectWithValue }) => {
//         const headers = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         };

//         try {
//             const response = await axios.post(`${Api}/add-shop`, { ...shopData, user_id }, headers);
//             console.log(response.data);
//             return response.data;
//         } catch (error: any) {
//             console.log("Add Shop error:", error.response?.data);
//             return rejectWithValue(
//                 error.response?.data || "Error occurred during shop addition"
//             );
//         }
//     }
// );

// export const addShop = createAsyncThunk(
//     "goals/addShop",
//     async (shopObjectWithToken, thunkAPI) => {
//         const { shopObj, token } = shopObjectWithToken;
//         const headers = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         try {
//             const response = await axios.post(`${Api}/add-shop`, shopObj, headers );
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// );

export const AllApplicationSlice = createSlice({
    name: "AllApplicationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllApplication.pending, (state: Application) => {
                state.isLoading = true;
            })
            .addCase(getAllApplication.fulfilled, (state: Application, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.applications = action.payload;
            })
            // .addCase(addShop.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            // })
    },
});

export default AllApplicationSlice.reducer;