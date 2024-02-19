import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SingleEquipments {
    data: {
        machine_type: 3, brand_name: string, machine_name: string, model_name: string,
        capacity: string, install_year: string, dosage: string, other_dosage: string, dc_no_tank: string,
        dc_solvent: string, dc_heat_Type: string, dc_filter: string, dc_frequency_motor: string,
        dc_spray_unit: string, dc_solvent_cooling_system: string, dc_distilation: string,
        dc_distilation_type: string, dc_distilation_method: string, wm_machion_type: string,
        wm_heat_type: string, wm_volume: string, wm_program_type: string, id: '',
        fe_finishing_equipment_type: string, dryer_type: string, dryer_volume: string,
        dryer_program_number: string, dryer_program_name: string, front_image: string, back_image: string,
        machine_type_name: string, dosage_name: string, machin_type: { name: string }, dosages: string
    };
}

interface Machine_Type_Shop {
    isLoading: boolean;
    get_all_data: {
        shop: [],
        machinType: [],
        dosage: []
    },
    get_all_Equipment: any[]
    single_equipment: SingleEquipments | null;
    get_edit_equipment: {
        data: {
            machine_type: 3, brand_name: string, machine_name: string, model_name: string,
            capacity: string, install_year: string, dosage: string, other_dosage: string, dc_no_tank: string,
            dc_solvent: string, dc_heat_Type: string, dc_filter: string, dc_frequency_motor: string,
            dc_spray_unit: string, dc_solvent_cooling_system: string, dc_distilation: string,
            dc_distilation_type: string, dc_distilation_method: string, wm_machion_type: string,
            wm_heat_type: string, wm_volume: string, wm_program_type: string, id: '', shop_id: ''
            fe_finishing_equipment_type: string, dryer_type: string, dryer_volume: string,
            dryer_program_number: string, dryer_program_name: string, front_image: string, back_image: string,
            machine_type_name: string, dosage_name: string, machin_type: { name: string }, dosages: string
        };
    }
}

const initialState: Machine_Type_Shop = {
    isLoading: false,
    get_all_data: {
        shop: [],
        machinType: [],
        dosage: []
    },
    get_all_Equipment: [],
    single_equipment: null,
    get_edit_equipment: {
        data: {
            machine_type: 3, brand_name: '', machine_name: '', model_name: '',
            capacity: '', install_year: '', dosage: '', other_dosage: '', dc_no_tank: '',
            dc_solvent: '', dc_heat_Type: '', dc_filter: '', dc_frequency_motor: '',
            dc_spray_unit: '', dc_solvent_cooling_system: '', dc_distilation: '',
            dc_distilation_type: '', dc_distilation_method: '', wm_machion_type: '',
            wm_heat_type: '', wm_volume: '', wm_program_type: '', id: '', shop_id: '',
            fe_finishing_equipment_type: '', dryer_type: '', dryer_volume: '',
            dryer_program_number: '', dryer_program_name: '', front_image: '', back_image: '',
            machine_type_name: '', dosage_name: '', machin_type: { name: '' }, dosages: ''
        },
    }
};

export const getAlldata = createAsyncThunk("get_all_Shop&Machine", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/equipment-data/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllEquipmentdata = createAsyncThunk("get_all_Equipment", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get_equipment/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const viewSingleEquipment = createAsyncThunk("view_equipments", async (equipmentId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/equipment-view/${equipmentId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const editEquipment = createAsyncThunk("edit_equipment", async (equipmentId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/edit-equipment/${equipmentId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const deleteEquipment = createAsyncThunk("delete-equipment", async (equipmentId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${Api}/delete-equipment/${equipmentId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const EquipmentsSlice = createSlice({
    name: "Equipment_Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlldata.pending, (state: Machine_Type_Shop) => {
                state.isLoading = true;
            })
            .addCase(getAlldata.fulfilled, (state: Machine_Type_Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_all_data = action.payload;
            })
            .addCase(getAllEquipmentdata.fulfilled, (state: Machine_Type_Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_all_Equipment = action.payload;
            })
            .addCase(viewSingleEquipment.fulfilled, (state: Machine_Type_Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.single_equipment = action.payload;
            })
            .addCase(editEquipment.fulfilled, (state: Machine_Type_Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_edit_equipment = action.payload;
            })
            .addCase(deleteEquipment.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_Equipment = state.get_all_Equipment.filter(equipment => equipment.id !== payload);
            })
    },
});

export default EquipmentsSlice.reducer;