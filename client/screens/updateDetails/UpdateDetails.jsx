import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import updateDetailsStyles from "./updateDetailsStyles";
import { signout, updateUserData } from "../../features/authUserSlice";

const UpdateDetails = ({ navigation }) => {
	const dispatch = useDispatch();
	//state variables
	const [isUpdateNameOpened, setIsUpdateNameOpened] = useState(false);
	const [isUpdatePasswordOpened, setIsUpdatePasswordOpened] = useState(false);
	const [isUpdateRoleOpened, setIsUpdateRoleOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [nameUpdateDone, setNameUpdateDone] = useState(false);
	const [passUpdateDone, setPassUpdateDone] = useState(false);
	const [forgotPassShow, setForgotPassShow] = useState(false);

	const [newName, setNewName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [newRole, setNewRole] = useState("");

	//auth context
	const authUserData = useSelector((state) => state.authUser);
	//sign out
	const signOut = async () => {
		//remove user auth data in auth context
		dispatch(signout());
		//remove user auth data in async storage
		await AsyncStorage.clear();
	};

	//onpress event : update name
	const handleUpdateName = async () => {
		if (newName !== "") {
			try {
				setIsLoading(true);
				const token = authUserData?.token !== "" && authUserData.token;
				console.log("token", token);

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
					dispatch(updateUserData(data));

					//save userData in async storage
					let as = await AsyncStorage.getItem("@AUD");
					as = JSON.parse(as);
					as.userData = data.userData;
					await AsyncStorage.setItem("@AUD", JSON.stringify(as));
				} else {
					console.log("failed to change name");
					alert("failed to change name");
				}
				setIsLoading(false);
				setNameUpdateDone(true);
				setTimeout(() => {
					setIsUpdateNameOpened(!isUpdateNameOpened);
					setNameUpdateDone(false);
				}, 1000);
				setNameUpdateDone(true);
			} catch (error) {
				alert("alert in update name", error.message);
				setIsLoading(false);
			}
		}
	};

	//onpress event : update password
	const handleUpdatePassword = async () => {
		console.log("check 1");
		if (
			(oldPassword !== "" || newPassword !== "" || confirmNewPassword !== "") &&
			newPassword === confirmNewPassword
		) {
			try {
				console.log("check 2");
				setIsLoading(true);
				const token = authUserData?.token !== "" && authUserData.token;
				console.log("check 3");
				const { data } = await axios.put(
					"https://linksdaily-server.onrender.com/api/user/update-password",
					{
						oldPassword,
						newPassword,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				console.log("check 4");
				if (data.status === "success") {
					setIsLoading(false);
					setForgotPassShow(false);
					setPassUpdateDone(true);
					setTimeout(() => {
						setIsUpdatePasswordOpened(!isUpdatePasswordOpened);
						setPassUpdateDone(false);
					}, 1000);
				}
				console.log("check 5");
				if (data.status === "failed") {
					alert("incorrect old password");
					setForgotPassShow(true);
					setOldPassword("");
					setNewPassword("");
					setConfirmNewPassword("");
				}
			} catch (error) {
				alert(error.message);
				setIsLoading(false);
				setForgotPassShow(false);
				setOldPassword("");
				setNewPassword("");
				setConfirmNewPassword("");
			}
		} else {
			if (newPassword !== confirmNewPassword) {
				alert("passwords not matched");
			} else {
				alert("all fields required");
			}
		}
	};

	//onpress event : update role
	const handleUpdateRole = () => {};
	return (
		<View style={updateDetailsStyles.cont}>
			<ScrollView style={updateDetailsStyles.updateSection}>
				<View style={updateDetailsStyles.updateCont}>
					<TouchableOpacity
						onPress={() => setIsUpdateNameOpened(!isUpdateNameOpened)}>
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
								value={newName}
							/>
							{nameUpdateDone ? (
								<View style={updateDetailsStyles.updateDoneCont}>
									<Image
										style={
											updateDetailsStyles.updateDoneImage
										}
										source={require("../../assets/done.png")}
									/>
									<Text style={updateDetailsStyles.doneText}>
										Done
									</Text>
								</View>
							) : (
								<TouchableOpacity
									onPress={handleUpdateName}
									style={updateDetailsStyles.Button}>
									{isLoading ? (
										<Text
											style={
												updateDetailsStyles.btnText
											}>
											Updating...
										</Text>
									) : (
										<Text
											style={
												updateDetailsStyles.btnText
											}>
											Update
										</Text>
									)}
								</TouchableOpacity>
							)}
						</View>
					)}
					<Divider width={1} />

					<TouchableOpacity
						onPress={() =>
							setIsUpdatePasswordOpened(!isUpdatePasswordOpened)
						}>
						<View style={updateDetailsStyles.updateTitleCont}>
							<Text style={updateDetailsStyles.title}>
								Update Password
							</Text>
						</View>
					</TouchableOpacity>
					<Divider width={1} />

					{isUpdatePasswordOpened && (
						<View style={updateDetailsStyles.innerUpdateCont}>
							<TextInput
								onChangeText={(text) => setOldPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="Old Password"
								value={oldPassword}
							/>
							<TextInput
								onChangeText={(text) => setNewPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="New Password"
								value={newPassword}
							/>
							<TextInput
								onChangeText={(text) => setConfirmNewPassword(text)}
								style={updateDetailsStyles.Input}
								placeholder="Confirm New Password"
								value={confirmNewPassword}
							/>
							{passUpdateDone ? (
								<View style={updateDetailsStyles.updateDoneCont}>
									<Image
										style={
											updateDetailsStyles.updateDoneImage
										}
										source={require("../../assets/done.png")}
									/>
									<Text style={updateDetailsStyles.doneText}>
										Done
									</Text>
								</View>
							) : (
								<TouchableOpacity
									onPress={handleUpdatePassword}
									style={updateDetailsStyles.Button}>
									{isLoading ? (
										<Text
											style={
												updateDetailsStyles.btnText
											}>
											Updating...
										</Text>
									) : (
										<Text
											style={
												updateDetailsStyles.btnText
											}>
											Update
										</Text>
									)}
								</TouchableOpacity>
							)}

							{forgotPassShow && (
								<Text style={updateDetailsStyles.forgot}>
									seems like you forgot your password, go on and{" "}
									<Text
										style={updateDetailsStyles.reset}
										onPress={() => signOut()}>
										reset
									</Text>{" "}
									password
								</Text>
							)}
						</View>
					)}
					<Divider width={1} />

					<TouchableOpacity
						onPress={() => setIsUpdateRoleOpened(!isUpdateRoleOpened)}>
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
								<Text style={updateDetailsStyles.btnText}>
									Update
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default UpdateDetails;
