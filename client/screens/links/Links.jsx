import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NavToolBar from "../../components/nav/Nav";
import linksStyles from "./linksStyles";

const Links = ({ navigation }) => {
	return (
		<View style={linksStyles.cont}>
			<View style={linksStyles.linksSection}>
				<Text style={{ fontSize: 25 }}>Links page</Text>
			</View>
			<NavToolBar navigation={navigation} />
		</View>
	);
};

export default Links;
