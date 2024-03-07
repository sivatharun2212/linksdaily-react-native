import { configureStore } from "@reduxjs/toolkit";
import regEmailSlice from "../features/regEmailSlice";
import authUserSlice from "../features/authUserSlice";
export const store = configureStore({
	reducer: {
		regEmail: regEmailSlice.reducer,
		authUser: authUserSlice.reducer,
	},
});
