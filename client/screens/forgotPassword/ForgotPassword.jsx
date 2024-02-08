import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { forgotPasswordStyles } from "./forgotPasswordStyles";
import axios from "axios";

const ForgotPassword = () => {
	const [registeredEmail, setRegisteredEmail] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const handleSendCode = async () => {
		if (registeredEmail !== "") {
			const verifiedUser = await axios.post("https://linksdaily-server.onrender.com/api/auth/verify-user", { registeredEmail });
			console.log("verifiedUser", verifiedUser);
		}
	};
	return (
		<>
			<View style={forgotPasswordStyles.cont}>
				<Text style={forgotPasswordStyles.title}>Your registered Email</Text>
				<TextInput
					style={forgotPasswordStyles.input}
					placeholder="user@gmail.com"
					autoFocus
					onChangeText={(text) => setRegisteredEmail(text)}
				/>
				<TouchableOpacity
					onPress={handleSendCode}
					style={forgotPasswordStyles.btnWrapper}>
					{!isCodeSent ? <Text style={forgotPasswordStyles.sendBtn}>Send reset Code</Text> : <Text style={forgotPasswordStyles.sendBtn}>Sent!</Text>}
				</TouchableOpacity>
			</View>
		</>
	);
};

export default ForgotPassword;
