import React, { useState } from "react";

import { Text, View, TouchableOpacity, Image } from "react-native";
import SignupStyles from "./SignupStyles"; // Correct import
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import axios from "axios";
const Signup = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		if (!name || !email || !password) {
			alert("all fields are required!");
			setIsLoading(false);
			return;
		}
		try {
			const { data } = await axios.post("https://neat-loops-smile.loca.lt/api/auth/signup", {
				name,
				email,
				password,
			});
			console.log(data);
			navigation.navigate("home");
			setIsLoading(false);
		} catch (err) {
			console.log(err);
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
