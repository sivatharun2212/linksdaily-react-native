import React, { useContext } from "react";
import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import homeStyles from "./homeStyles";
import NavToolBar from "../../components/nav/Nav";
import { AuthContext } from "../../context/authContext";
const Home = ({ navigation }) => {
	//context
	const [authUserData] = useContext(AuthContext);
	return (
		<View style={homeStyles.cont}>
			<View style={homeStyles.homeSection}>
				<Text style={{ fontSize: 25 }}>Homepage</Text>
				<Text>{JSON.stringify(authUserData)}</Text>
			</View>
			<NavToolBar navigation={navigation} />
		</View>
	);
};
export default Home;
