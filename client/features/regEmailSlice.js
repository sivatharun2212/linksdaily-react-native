import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadEmailFromAS = createAsyncThunk("regEmail/loadEmailFromAS", async () => {
	try {
		let asUserData = await AsyncStorage.getItem("@RUE");
		return asUserData;
	} catch (error) {
		console.log("loadFromAsyncStorage err", error.message);
	}
});
const initialState = {
	registeredUserEmail: "",
};

const regEmailSlice = createSlice({
	name: "regEmail",
	initialState,
	reducers: {
		updateRegEmail: (state, action) => {
			state.registeredUserEmail = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadEmailFromAS.fulfilled, (state, { payload }) => {
			state.registeredUserEmail = payload ? payload : "";
		});
	},
});

export const { updateRegEmail } = regEmailSlice.actions;

export default regEmailSlice;
