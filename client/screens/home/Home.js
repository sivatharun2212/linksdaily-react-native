import React, { useContext } from "react";
import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

import homeStyles from "./homeStyles";
import NavToolBar from "../../components/nav/Nav";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = ({ navigation }) => {
	//auth context
	const [authUserData] = useContext(AuthContext);
	console.log("home as and con", AsyncStorage.getItem("@AUD"), "authUserData", authUserData);
	return (
		<View style={homeStyles.cont}>
			<View style={homeStyles.homeSection}>
				<Text style={{ fontSize: 25 }}>Homepage</Text>
				{authUserData?.token && <Text>{authUserData.token}</Text>}
			</View>
			<NavToolBar navigation={navigation} />
		</View>
	);
};
export default Home;
