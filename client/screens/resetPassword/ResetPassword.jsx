import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { resetPasswordStyles } from "./resetPasswordStyles";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const ResetPassword = ({ navigation }) => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// context
	const [registeredUserEmail] = useContext(AuthContext);

	const handleResetPassword = async () => {
		const email = await registeredUserEmail;
		if ((newPassword !== "" || confirmPassword !== "") && newPassword === confirmPassword) {
			const resetPassword = await axios.post("https://linksdaily-server.onrender.com/api/auth/reset-password", { email, password: newPassword });
			if ((resetPassword.data.status = "success")) {
				navigation.navigate("login");
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
