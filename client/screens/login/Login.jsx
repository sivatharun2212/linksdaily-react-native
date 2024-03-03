import React, { useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginStyles from "./loginStyles";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import { AuthContext } from "../../context/authContext";

const Login = ({ navigation }) => {
	//state variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	//auth context
	const [authUserData, setAuthUserData] = useContext(AuthContext);

	//onpress event : login button click
	const handleSubmit = async () => {
		setIsLoading(true);
		if (!email || !password) {
			alert("all fields are required!");
			setIsLoading(false);
			return;
		}
		try {
			//send post request to login user
			const { data } = await axios.post(
				"https://linksdaily-server.onrender.com/api/auth/login",
				{
					email,
					password,
				}
			);

			// save auth user data in async storage
			await AsyncStorage.setItem(
				"@AUD",
				JSON.stringify({
					token: data.token,
					userData: data.userData,
				})
			);
			// console.log("as", AsyncStorage);

			//update auth user data in auth context
			setAuthUserData((prevState) => ({
				...prevState,
				token: data.token,
				userData: data.userData,
			}));
			navigation.navigate("home");
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	return (
		<>
			<View style={LoginStyles.container}>
				<View style={LoginStyles.brandLogoCont}>
					<Image
						style={LoginStyles.logo}
						source={require("../../assets/brand.png")}
					/>
				</View>
				<Text style={LoginStyles.title}>Log In</Text>
				<UserInput
					label="Email"
					value={email}
					setValue={setEmail}
				/>
				<UserInput
					label="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={() => navigation.navigate("forgot-password")}>
					<Text style={LoginStyles.forgot}>Forgot Password?</Text>
				</TouchableOpacity>
				<Button
					title="Log In"
					handleSubmit={handleSubmit}
					loading={isLoading}
				/>
				<View style={{ alignItems: "center", marginTop: 10 }}>
					<Text style={LoginStyles.toSignup}>
						New to Links Daily?{"  "}
						<TouchableOpacity>
							<Text
								onPress={() => navigation.navigate("signup")}
								style={{ color: "#997a00", fontWeight: "800" }}>
								Sign Up
							</Text>
						</TouchableOpacity>
					</Text>
				</View>
			</View>
		</>
	);
};

export default Login;
