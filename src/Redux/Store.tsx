import { configureStore } from "@reduxjs/toolkit";
import AllCountrySlice from './Features/AllCountrySlice'
import AuthSlice from './Features/AuthSlice'
import getUsers  from "./Features/UserSlice";
import AllApplicationSlice from "./Features/AllApplicationSlice";
import ShopSlice from "./Features/ShopSlice";
import DosageSlice from "./Features/DosageSlice";
import EquipmentsSlice  from "./Features/EquipmentsSlice";
import SubUserSlice from "./Features/SubUserSlice";
import CountOfAllDataSlice from "./Features/CountOfAllDataSlice";
import RaiseQuerySlice from "./Features/RaiseQuerySlice";

const Store = configureStore({
    reducer: {
        authUser: AuthSlice,
        countries: AllCountrySlice,
        user: getUsers,
        allApplications: AllApplicationSlice,
        allshops: ShopSlice,
        dosages: DosageSlice,
        equipments: EquipmentsSlice,
        subuser: SubUserSlice,
        counts: CountOfAllDataSlice,
        query: RaiseQuerySlice
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;