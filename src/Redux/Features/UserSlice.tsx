import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../BaseUrl/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const initialState = {
    get_user: {
        name: '', email: '', id: '', country_id: '', phone: '', calling_code: '', profile_photo_path: '',
        country: {
            name: '', flag: '', id: '', calling_code: ''
        }
    },
    isLoading: false,
};

export const getUsers = createAsyncThunk("get_user/getUsers", async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.get(`${Api}/get_user`, headers);
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        // throw error
    }
});

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.get_user = action.payload.user;
            })
    },
});

export default UserSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Api } from "../../BaseUrl/BaseUrl";

// interface User {
//     name: string;
//     email: string;
//     profile_photo_url: string;
// }

// interface UserState {
//     get_user: User;
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     get_user: {
//         name: '', email: '', profile_photo_url: '',
//     },
//     isLoading: false,
//     error: null,
// };

// export const getUsers = createAsyncThunk<User>("get_user/getUsers",
//     async (token: any, { rejectWithValue }) => {
//         const headers = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         try {
//             const response = await axios.get(`${Api}/get_user`, headers);
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue("Error fetching user data");
//         }
//     }
// );

// export const userSlice = createSlice({
//     name: "UserSlice",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUsers.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getUsers.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.get_user = action.payload;
//             })
            // .addCase(getUsers.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.error = action.payload as string;
            // });
//     },
// });
 
// export default userSlice.reducer;
