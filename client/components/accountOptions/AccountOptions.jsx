import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import accOptStyles from "./accOptStyles";
import { AuthContext } from "../../context/authContext";
const AccountOptions = () => {
	const navigation = useNavigation();
	const [authUserData, setAuthUserData] = useContext(AuthContext);

	const signOut = async () => {
		//remove user auth data in auth context
		setAuthUserData((prevState) => ({ ...prevState, registeredUserEmail: "", token: "", userData: null }));
		//remove user auth data in async storage
		await AsyncStorage.clear();
	};
	const options = [
		{
			icon: "user-edit",
			title: "Update Details",
			onpress: () => navigation.navigate("update-details"),
		},
		{
			icon: "sign-out-alt",
			title: "Sign Out",
			onpress: () => signOut(),
		},
	];
	return (
		<View style={accOptStyles.optCont}>
			{options.map((opt) => {
				return (
					<TouchableOpacity
						onPress={opt.onpress}
						key={opt.title}>
						<View style={accOptStyles.option}>
							<View style={accOptStyles.iconCont}>
								<FontAwesome5
									name={opt.icon}
									size={25}
									color={"#997a00"}
								/>
							</View>
							<Text style={accOptStyles.titleText}>{opt.title}</Text>
						</View>
						<Divider />
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default AccountOptions;
