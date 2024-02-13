import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import updateDetailsStyles from "./updateDetailsStyles";
import { AuthContext } from "../../context/authContext";

const UpdateDetails = () => {
	//state variables
	const [isUpdateNameOpened, setIsUpdateNameOpened] = useState(false);
	const [isUpdatePasswordOpened, setIsUpdatePasswordOpened] = useState(false);
	const [isUpdateRoleOpened, setIsUpdateRoleOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newName, setNewName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [newRole, setNewRole] = useState("");

	//auth context
	const [authUserData, setAuthUserData] = useContext(AuthContext);

	//onpress event : update name
	const handleUpdateName = async () => {
		if (newName !== "") {
			try {
				setIsLoading(true);
				const token = authUserData?.token !== "" && authUserData.token;
				const { data } = await axios.put(
					"https://linksdaily-server.onrender.com/api/user/update-name",
					{ name: newName },
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				if (data.status === "success") {
					//update userData in context
					setAuthUserData((prevState) => ({ ...prevState, userData: data.userData }));

					//save userData in async storage
					const as = await AsyncStorage.getItem("@AUD");
					as = JSON.parse(as);
					as.userData = data.userData;
					await AsyncStorage.setItem("@AUD", JSON.stringify(as));
				}
				setIsLoading(false);
			} catch (error) {
				alert(error.message);
				setIsLoading(false);
			}
		}
	};

	//onpress event : update password
	const handleUpdatePassword = () => {};

	//onpress event : update role
	const handleUpdateRole = () => {};
	return (
		<View style={updateDetailsStyles.cont}>
			<ScrollView style={updateDetailsStyles.updateSection}>
				<View style={updateDetailsStyles.updateCont}>
					<TouchableOpacity onPress={() => setIsUpdateNameOpened(!isUpdateNameOpened)}>
						<View style={updateDetailsStyles.updateTitleCont}>
							<Text style={updateDetailsStyles.title}>Update Name</Text>
						</View>
					</TouchableOpacity>
					<Divider width={1} />
					{isUpdateNameOpened && (
						<View style={updateDetailsStyles.innerUpdateCont}>
							<TextInput
								onChangeText={(text) => setNewName(text)}
								style={updateDetailsStyles.Input}
								placeholder="New Name"
							/>
							<TouchableOpacity
								onPress={handleUpdateName}
								style={updateDetailsStyles.Button}>
								{isLoading ? <Text style={updateDetailsStyles.btnText}>Updating...</Text> : <Text style={updateDetailsStyles.btnText}>Update</Text>}
							</TouchableOpacity>
						</View>
					)}
					<Divider width={1} />

					<TouchableOpacity onPress={() => setIsUpdatePasswordOpened(!isUpdatePasswordOpened)}>
						<View style={updateDetailsStyles.updateTitleCont}>
							<Text style={updateDetailsStyles.title}>Update Password</Text>
						</View>
					</TouchableOpacity>
					<Divider width={1} />

					{isUpdatePasswordOpened && (
						<View style={updateDetailsStyles.innerUpdateCont}>
							<TextInput
								onChangeText={(text) => setOldPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="Old Password"
							/>
							<TextInput
								onChangeText={(text) => setNewPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="New Password"
							/>
							<TextInput
								onChangeText={(text) => setConfirmNewPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="Confirm New Password"
							/>
							<TouchableOpacity
								onPress={handleUpdatePassword}
								style={updateDetailsStyles.Button}>
								<Text style={updateDetailsStyles.btnText}>Update</Text>
							</TouchableOpacity>
						</View>
					)}
					<Divider width={1} />

					<TouchableOpacity onPress={() => setIsUpdateRoleOpened(!isUpdateRoleOpened)}>
						<View style={updateDetailsStyles.lastUpdateTitleCont}>
							<Text style={updateDetailsStyles.title}>Update Role</Text>
						</View>
					</TouchableOpacity>
					{isUpdateRoleOpened && (
						<View style={updateDetailsStyles.lastInnerUpdateCont}>
							<TextInput
								onChangeText={(text) => setNewRole(text)}
								style={updateDetailsStyles.Input}
								placeholder="New Role"
							/>
							<TouchableOpacity
								onPress={handleUpdateRole}
								style={updateDetailsStyles.Button}>
								<Text style={updateDetailsStyles.btnText}>Update</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default UpdateDetails;
