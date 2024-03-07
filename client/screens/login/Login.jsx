import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginStyles from "./loginStyles";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../features/authUserSlice";
import { loadDataFromAS } from "../../features/authUserSlice";
import { loadEmailFromAS } from "../../features/regEmailSlice";

const Login = ({ navigation }) => {
	//state variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	//auth context
	const dispatch = useDispatch();
	const authUserData = useSelector((state) => state.authUser);
	console.log("authUserData before", authUserData);

	useEffect(() => {
		dispatch(loadDataFromAS());
		dispatch(loadEmailFromAS());
	}, []);
	//function to save in async storage
	const saveUserData = async (data) => {
		try {
			await AsyncStorage.setItem(
				"@AUD",
				JSON.stringify({
					token: data.token,
					userData: data.userData,
				})
			);
			console.log("Data saved successfully to AsyncStorage");
		} catch (error) {
			console.log("Error saving data to AsyncStorage:", error.message);
		}
	};

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
			if (data && data.status === "success") {
				// save auth user data in async storage
				saveUserData(data);
				//update auth user data in auth context
				dispatch(updateUserData(data));

				navigation.navigate("home");
				setIsLoading(false);
			} else {
				console.log("req failed");
			}
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
