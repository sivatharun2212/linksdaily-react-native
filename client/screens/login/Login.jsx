import React, { useState } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";
import LoginStyles from "./loginStyles";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import axios from "axios";
const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		if (!email || !password) {
			alert("all fields are required!");
			setIsLoading(false);
			return;
		}
		try {
			const { data } = await axios.post("https://linksdaily-server.onrender.com/api/auth/login", {
				email,
				password,
			});
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
				<TouchableOpacity>
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
