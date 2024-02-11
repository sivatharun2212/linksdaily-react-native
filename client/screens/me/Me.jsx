import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import NavToolBar from "../../components/nav/Nav";
import meStyles from "./meStyles";
import { AuthContext } from "../../context/authContext";

const Me = ({ navigation }) => {
	//context
	const [authUserData, setAuthUserData] = useContext(AuthContext);
	const { name, email } = authUserData?.userData;
	return (
		<View style={meStyles.cont}>
			<ScrollView
				bounces={true}
				style={meStyles.meSection}>
				<Text>{name}</Text>
				<Text>{email}</Text>
			</ScrollView>
			<NavToolBar navigation={navigation} />
		</View>
	);
};

export default Me;
