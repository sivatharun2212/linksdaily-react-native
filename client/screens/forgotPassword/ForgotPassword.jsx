import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { forgotPasswordStyles } from "./forgotPasswordStyles";
import { AuthContext } from "../../context/authContext";

const ForgotPassword = ({ navigation }) => {
	//state variables
	const [registeredEmail, setRegisteredEmail] = useState("");
	const [isUserVerified, setIsUserVerified] = useState(false);
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [otp, setOtp] = useState(false);

	//auth context
	const [authUserData, setAuthUserData] = useContext(AuthContext);
	//onpress event : send reset code button click
	const handleSendCode = async () => {
		if (registeredEmail !== "") {
			setIsOtpSent(true);
			//send post request to verify user
			const { data } = await axios.post("https://linksdaily-server.onrender.com/api/auth/verify-user", { email: registeredEmail });
			if (data.status === "success") {
				//update registered user email in auth context
				setAuthUserData((prevState) => ({ ...prevState, registeredUserEmail: registeredEmail }));
				//add registered user email in async storage
				await AsyncStorage.setItem("@RUE", registeredEmail);

				//send post request to send email to user for reseting the password
				const sendOtp = await axios.post("https://linksdaily-server.onrender.com/api/auth/forgot-password", { email: registeredEmail });
				if ((sendOtp.data.status = "success")) {
					setIsUserVerified(true);
				}
			} else {
				setIsOtpSent(false);
				setIsUserVerified(false);
			}
		}
	};

	//onpress event : reset password button to create and confirm a new password
	const handelResetPass = async () => {
		//check the otp length
		if (otp && otp.length === 6) {
			//send post request to validate otp
			const resetPassword = await axios.post("https://linksdaily-server.onrender.com/api/auth/validate-otp", { otp, email: registeredEmail });
			if (resetPassword.data.status === "success") {
				navigation.navigate("reset-password");
			}
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
					style={[forgotPasswordStyles.btnWrapper, { backgroundColor: isUserVerified ? "#a5d1d1" : "#009999" }]}
					disabled={isUserVerified}>
					{!isOtpSent ? (
						<Text style={forgotPasswordStyles.sendBtn}>Send reset Code</Text>
					) : !isUserVerified ? (
						<Text style={forgotPasswordStyles.sendBtn}>Sending!</Text>
					) : (
						<Text style={forgotPasswordStyles.sendBtn}>Sent!</Text>
					)}
				</TouchableOpacity>
				{isUserVerified && (
					<View style={forgotPasswordStyles.codeCont}>
						<TextInput
							style={forgotPasswordStyles.input}
							placeholder="######"
							autoFocus
							onChangeText={(text) => setOtp(text)}
						/>
						<TouchableOpacity
							onPress={handelResetPass}
							style={forgotPasswordStyles.btnWrapper}>
							<Text style={forgotPasswordStyles.sendBtn}>Reset password</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</>
	);
};

export default ForgotPassword;
