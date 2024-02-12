import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import SignupStyles from "./SignupStyles";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import { AuthContext } from "../../context/authContext";

const Signup = ({ navigation }) => {
	//state variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	//auth context
	const [authUserData, setAuthUserData] = useContext(AuthContext);

	//onpress event : signup button click
	const handleSubmit = async () => {
		setIsLoading(true);
		if (!name || !email || !password) {
			alert("all fields are required!");
			setIsLoading(false);
			return;
		}
		try {
			//send post request to create new user in database
			const { data } = await axios.post("https://linksdaily-server.onrender.com/api/auth/signup", {
				name,
				email,
				password,
			});
			//console.log(data);

			//save auth user data to async storage
			await AsyncStorage.setItem(
				"@AUD",
				JSON.stringify({
					token: data.token,
					userData: data.userData,
				})
			);

			//update auth user data in auth context
			setAuthUserData((prevState) => ({ ...prevState, token: data.token, userData: data.userData }));
			//navigate to home screen
			navigation.navigate("home");
			setIsLoading(false);
		} catch (err) {
			// console.log(err);
			setIsLoading(false);
		}
	};
	return (
		<>
			<View style={SignupStyles.container}>
				<View style={SignupStyles.brandLogoCont}>
					<Image
						style={SignupStyles.logo}
						source={require("../../assets/brand.png")}
					/>
				</View>
				<Text style={SignupStyles.title}>Sign Up</Text>
				<UserInput
					label="Name"
					value={name}
					setValue={setName}
					autoCapitalize="words"
				/>
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
				<Button
					title="Sign Up"
					handleSubmit={handleSubmit}
					loading={isLoading}
				/>
				<View style={{ alignItems: "center", marginTop: 10 }}>
					<Text style={SignupStyles.toLogin}>
						Already have an account?{"  "}
						<TouchableOpacity>
							<Text
								onPress={() => navigation.navigate("login")}
								style={{ color: "#997a00", fontWeight: "900" }}>
								Log In
							</Text>
						</TouchableOpacity>
					</Text>
				</View>
			</View>
		</>
	);
};

export default Signup;
