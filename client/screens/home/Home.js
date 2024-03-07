import React, { useEffect } from "react";
import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import homeStyles from "./homeStyles";
import NavToolBar from "../../components/nav/Nav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadDataFromAS } from "../../features/authUserSlice";
import { loadEmailFromAS } from "../../features/regEmailSlice";

const Home = ({ navigation }) => {
	const authUserData = useSelector((state) => state.authUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadDataFromAS());
		dispatch(loadEmailFromAS());
	}, []);

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
