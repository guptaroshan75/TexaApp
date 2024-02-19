import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SingleShop {
    shop: {
        shop_name: string;
        shop_contact_person: string;
        email: string;
        phone: string;
        country_code: string;
    };
    applicationType: any[];
    shop_product: any[];
    image: string[];
}

interface Shop {
    isLoading: boolean;
    get_all_Shop: any[];
    single_shop: SingleShop | null;
    get_edit_shop: {
        shop: {
            shop_name: '', id: '', shop_contact_person: '', email: '', phone: '', country_code: '',
        };
        image: [],
        shop_product: [],
        applicationType: [],
    }
}

const initialState: Shop = {
    isLoading: false,
    get_all_Shop: [],
    single_shop: null,
    get_edit_shop: {
        shop: {
            shop_name: '', id: '', shop_contact_person: '', email: '', phone: '', country_code: '',
        },
        image: [],
        shop_product: [],
        applicationType: []
    }
};

export const getAllShop = createAsyncThunk("get_all_shop", async (userId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${Api}/get_shop/${userId}`, headers);        
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const viewSingleShop = createAsyncThunk("view_shop", async (shopId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/view-shop/${shopId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const editShop = createAsyncThunk("edit_shop", async (shopId: string) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${Api}/edit-shop/${shopId}`, headers);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const deleteShop = createAsyncThunk("delete_shop", async (shopId: number) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${Api}/delete-shop/${shopId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const ShopSlice = createSlice({
    name: "Shop_Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShop.pending, (state: Shop) => {
                state.isLoading = true;
            })
            .addCase(getAllShop.fulfilled, (state: Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_all_Shop = action.payload.user;
            })
            .addCase(viewSingleShop.fulfilled, (state: Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.single_shop = action.payload;
            })
            .addCase(editShop.fulfilled, (state: Shop, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_edit_shop = action.payload;
            })
            .addCase(deleteShop.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.get_all_Shop = state.get_all_Shop.filter(shop => shop.id !== payload);
            })
    },
});

export default ShopSlice.reducer;