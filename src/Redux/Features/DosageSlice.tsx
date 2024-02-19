import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Dosage {
    isLoading: boolean;
    get_all_Dosage: any[];
    single_dosage: {
        data: {
            model_name: string; model_no: string; product_no: string;
            pupmps_no: string; washers_no: string;
            front_image: string; back_image: string;
        }
    }
    get_edit_dosage: {
        data: {
            model_name: '', model_no: '', product_no: '', pupmps_no: '', washers_no: '',
            front_image: '', back_image: '', id: ''
        },
    }
}

const initialState: Dosage = {
    isLoading: false,
    get_all_Dosage: [],
    single_dosage: {
        data: {
            model_name: '', model_no: '', product_no: '',
            pupmps_no: '', washers_no: '',
            front_image: '', back_image: '',
        }
    },
    get_edit_dosage: {
        data: {
            model_name: '', model_no: '', product_no: '', pupmps_no: '', washers_no: '',
            front_image: '', back_image: '', id: '',
        },
    }
};

export const getAllDosage = createAsyncThunk("get_all_dosage", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get_dosage/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const viewSingleDosage = createAsyncThunk("view_dosage", async (dosageId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/view-dosage/${dosageId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const editDosage = createAsyncThunk("edit_dosage", async (dosageId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/edit-dosage/${dosageId}`, headers);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const deleteDosage = createAsyncThunk("delete-dosage", async (dosageId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${Api}/delete-dosage/${dosageId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const DosageSlice = createSlice({
    name: "Dosage_Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDosage.pending, (state: Dosage) => {
                state.isLoading = true;
            })
            .addCase(getAllDosage.fulfilled, (state: Dosage, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_all_Dosage = action.payload;
            })
            .addCase(viewSingleDosage.fulfilled, (state: Dosage, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.single_dosage = action.payload;
            })
            .addCase(editDosage.fulfilled, (state: Dosage, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_edit_dosage = action.payload;
            })
            .addCase(deleteDosage.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_Dosage = state.get_all_Dosage.filter(dosage => dosage.id !== payload);
            })
    },
});

export default DosageSlice.reducer;