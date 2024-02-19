import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IDParams {
    selectedShopId: string,
    selectedAppId: string
}

interface QueryParams {
    userId: string,
    case_id: number
}

interface ApplicationQuery {
    isLoading: boolean;
    applicationsQuery: {
        data: any[]
    },
    applicationsQueryProduct: {
        data: any[]
    },
    get_all_query: any[],
    single_query: {
        data: any[]
    },
}

const initialState: ApplicationQuery = {
    isLoading: false,
    applicationsQuery: {
        data: []
    },
    applicationsQueryProduct: {
        data: []
    },
    get_all_query: [],
    single_query: {
        data: []
    }
};

export const getAllApplicationTypeQuery = createAsyncThunk("get_all_application_Query",
    async (selectedShopId: string) => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await axios.get(`${Api}/get-query-applicationtype/${selectedShopId}`, headers);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getAllApplicationTypeQueryProduct = createAsyncThunk("get_all_application_Query_Product",
    async ({ selectedShopId, selectedAppId }: IDParams) => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await axios.get(`${Api}/get-query-product/${selectedShopId}/${selectedAppId}`, headers);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getAllQuery = createAsyncThunk("get-query-list", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get-query-list/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const viewSingleQuery = createAsyncThunk("view_Query", async ({ userId, case_id }: QueryParams) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/view-query/${userId}/${case_id}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteQuery = createAsyncThunk("delete-Query", async (caseId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${Api}/delete-query/${caseId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const AllApplicationSlice = createSlice({
    name: "AllApplicationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllApplicationTypeQuery.pending, (state: ApplicationQuery) => {
                state.isLoading = true;
            })
            .addCase(getAllApplicationTypeQuery.fulfilled, (state: ApplicationQuery, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.applicationsQuery = action.payload;
            })
            .addCase(getAllApplicationTypeQueryProduct.fulfilled, (state: ApplicationQuery, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.applicationsQueryProduct = action.payload;
            })
            .addCase(getAllQuery.fulfilled, (state: ApplicationQuery, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_all_query = action.payload.data;
            })
            .addCase(viewSingleQuery.fulfilled, (state: ApplicationQuery, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.single_query = action.payload;
            })
            .addCase(deleteQuery.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_query = state.get_all_query.filter(query => query.id !== payload);
            })
    },
});

export default AllApplicationSlice.reducer;