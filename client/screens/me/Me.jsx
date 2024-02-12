import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as imagePicker from "expo-image-picker";

import NavToolBar from "../../components/nav/Nav";
import meStyles from "./meStyles";
import { AuthContext } from "../../context/authContext";

const Me = ({ navigation }) => {
	//state variables
	const [uploadedImage, setUploadedImage] = useState("");
	// const [imgUploadData, setImgUploadData] = useState("");

	//auth context
	const [authUserData, setAuthUserData] = useContext(AuthContext);
	const { name, email } = authUserData?.userData;

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
			console.log("datafrom me", data);
		}
	};

	return (
		<View style={meStyles.cont}>
			<ScrollView
				bounces={true}
				style={meStyles.meSection}>
				<View style={meStyles.imageCont}>
					{uploadedImage !== "" ? (
						<Image
							style={{ width: 160, height: 160, alignSelf: "center", resizeMode: "cover" }}
							source={{ uri: uploadedImage }}
						/>
					) : (
						<Image
							style={{ width: 160, height: 160, alignSelf: "center", resizeMode: "cover" }}
							source={require("../../assets/rose.jpg")}
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
				<Text>{name}</Text>
				<Text>{email}</Text>
			</ScrollView>
			<NavToolBar navigation={navigation} />
		</View>
	);
};

export default Me;
