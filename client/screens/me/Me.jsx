import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as imagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NavToolBar from "../../components/nav/Nav";
import meStyles from "./meStyles";
import AccountOptions from "../../components/accountOptions/AccountOptions";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../features/authUserSlice";
const Me = ({ navigation }) => {
	const dispatch = useDispatch();
	//state variables
	const [uploadedImage, setUploadedImage] = useState("");
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [imgUploadData, setImgUploadData] = useState("");

	//auth context
	const authUserData = useSelector((state) => state.authUser);

	useEffect(() => {
		if (authUserData?.image?.url) {
			setUploadedImage("");
		}
	}, [authUserData]);
	// useEffect(() => {
	// 	console.log("context from me", authUserData);
	// 	if (authUserData?.userData?.name && authUserData?.userData?.email) {
	// 		setName(authUserData.userData.name);
	// 		setEmail(authUserData.userData.email);
	// 	}
	// }, [authUserData]);

	//onpress event : update profile icon click
	const handleImageUpload = async () => {
		//request permission to access media library
		const permissionResult = await imagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert("Media access is required");
			return;
		}
		//launch image library
		const result = await imagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4],
			base64: true,
		});
		//if user cancel the launch event
		if (result.canceled === true) {
			return;
		}

		//get image from image picker
		const base64Image = `data:image/jpg;base64,${result.assets[0].base64}`;
		setUploadedImage(base64Image);
		const token = authUserData?.token !== "" && authUserData.token;
		//send api request to save updated profile image
		const { data } = await axios.post(
			"https://linksdaily-server.onrender.com/api/user/upload-image",
			{
				image: base64Image,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		if (data) {
			//update image in auth context
			dispatch(updateUserData(data));
			//update authUserData in async storage
			let as = await AsyncStorage.getItem("@AUD");
			as = JSON.parse(as);
			as.userData = data.userData;
			await AsyncStorage.setItem("@AUD", JSON.stringify(as));
			console.log("checking image in context", authUserData);
		}
	};

	return (
		<View style={meStyles.cont}>
			<ScrollView
				bounces={true}
				style={meStyles.meSection}>
				<View style={meStyles.imageCont}>
					{uploadedImage ? (
						<Image
							style={{
								width: 160,
								height: 160,
								alignSelf: "center",
								resizeMode: "cover",
							}}
							source={{ uri: uploadedImage }}
						/>
					) : authUserData?.image && authUserData.image.url ? (
						<Image
							style={{
								width: 160,
								height: 160,
								alignSelf: "center",
								resizeMode: "cover",
							}}
							source={{ uri: authUserData.image.url }}
						/>
					) : (
						<Image
							style={{
								width: 160,
								height: 160,
								alignSelf: "center",
								resizeMode: "cover",
							}}
							source={require("../../assets/default-user.jpg")}
						/>
					)}
				</View>
				<View style={meStyles.editImgCont}>
					<TouchableOpacity onPress={handleImageUpload}>
						<FontAwesome5
							name="edit"
							size={15}
							color="#009999"
						/>
					</TouchableOpacity>
				</View>
				<View style={meStyles.userInfo}>
					<Text style={meStyles.userName}>{authUserData.name}</Text>
					<Text style={meStyles.userEmail}>{authUserData.email}</Text>
					<AccountOptions />
				</View>
			</ScrollView>
			<NavToolBar navigation={navigation} />
		</View>
	);
};

export default Me;
