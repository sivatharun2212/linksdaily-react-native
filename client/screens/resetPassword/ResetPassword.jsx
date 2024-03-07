import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { resetPasswordStyles } from "./resetPasswordStyles";

const ResetPassword = ({ navigation }) => {
	//state variables
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resData, setResData] = useState("");
	//auth context
	const email = useSelector((state) => state.regEmail.registeredUserEmail);
	//onpress event : done button click
	const handleResetPassword = async () => {
		if ((newPassword !== "" || confirmPassword !== "") && newPassword === confirmPassword) {
			//send post request to reset password
			const { data } = await axios.post(
				"https://linksdaily-server.onrender.com/api/auth/reset-password",
				{ email, password: newPassword }
			);
			if (data.status === "success") {
				navigation.navigate("login");
			}
			if (data.status === "error") {
				setResData(data.message);
			}
		}
	};

	return (
		<>
			<View style={resetPasswordStyles.cont}>
				<Text style={resetPasswordStyles.title}>Reset your password</Text>
				<TextInput
					style={resetPasswordStyles.input}
					placeholder="New password"
					autoFocus
					onChangeText={(text) => setNewPassword(text)}
				/>
				<TextInput
					style={resetPasswordStyles.input}
					placeholder="Confirm password"
					onChangeText={(text) => setConfirmPassword(text)}
				/>
				<TouchableOpacity
					onPress={handleResetPassword}
					style={resetPasswordStyles.btnWrapper}>
					<Text style={resetPasswordStyles.sendBtn}>Done</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default ResetPassword;
