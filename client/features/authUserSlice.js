import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadDataFromAS = createAsyncThunk("authUser/loadDataFromAS", async () => {
	try {
		let asUserData = await AsyncStorage.getItem("@AUD");
		if (asUserData) {
			let data = JSON.parse(asUserData);
			return data;
		}
	} catch (error) {
		console.log("loadDataFromAS err", error.message);
	}
});
const initialState = {
	token: "",
	userId: "",
	email: "",
	image: {
		public_id: "",
		url: "",
	},
	name: "",
};
const authUserSlice = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		updateUserData: (state, action) => {
			console.log("state before update", state);
			console.log("action before update", action);
			state.email = action.payload.userData.email;
			state.token = action.payload.token ? action.payload.token : state.token;
			state.name = action.payload.userData.name;
			state.image.public_id = action.payload.userData?.image?.public_id
				? action.payload.userData.image.public_id
				: state.image.public_id;
			state.image.url = action.payload.userData?.image?.url
				? action.payload.userData.image.url
				: state.image.url;
			console.log("state after update", state);
			console.log("action after update", action);
		},
		signout: (state) => {
			state.token = "";
			state.userId = "";
			state.email = "";
			state.image.public_id = "";
			state.image.url = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadDataFromAS.fulfilled, (state, { payload }) => {
			state.token = payload?.token || "";
			state.userId = payload?.userData._id || "";
			state.email = payload?.userData.email || "";
			state.name = payload?.userData.name || "";
			state.image.public_id = payload?.userData.image.public_id || "";
			state.image.url = payload?.userData.image.url || "";
		});
	},
});

export const { updateUserData, signout } = authUserSlice.actions;
export default authUserSlice;
// {"registeredUserEmail": "", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQ
// iOiI2NWQ0MzM4NWM5MzY4MTUxMTIzNTkxZDMiLCJlbWFpbCI6InNpdmF0aGFydW4yMjEyQGdtYWlsLmNvbSIsIml
// hdCI6MTcwODY3OTAzMCwiZXhwIjoxNzA5MjgzODMwfQ.QotBi-x5aWOO6VMQBK70Np8fPx974KTz_OBhaRiT
// sZk", "userData": {"__v": 0, "_id": "65d43385c9368151123591d3",
// "createdAt": "2024-02-20T05:07:17.197Z", "email": "sivatharun2212@gmail.com",
//  "image": {"public_id": "10ZbY-Rq6XnHVaOjG62k7", "url": "https://res.cloudinary.com/dpn
//  zucco8/image/upload/v1708678963/10ZbY-Rq6XnHVaOjG62k7.jpg"}, "name": "Sicadg", "updatedAt":
//  "2024-02-23T09:02:43.717Z"}}
