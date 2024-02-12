import React, { useContext } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/authContext";

const HeaderSignout = () => {
	//state variables
	const [authUserData, setAuthUserData] = useContext(AuthContext);

	//onpress event : sign out button click
	const signout = async () => {
		//remove user auth data in auth context
		setAuthUserData((prevState) => ({ ...prevState, registeredUserEmail: "", token: "", userData: null }));
		//remove user auth data in async storage
		await AsyncStorage.clear();

		// // Verify AsyncStorage has been cleared
		// const audItem = await AsyncStorage.getItem("@AUD");
		// const rueItem = await AsyncStorage.getItem("@RUE");
		// if (!audItem && !rueItem) {
		// 	console.log("AsyncStorage cleared.");
		// } else {
		// 	console.log("AsyncStorage not cleared:", audItem, rueItem);
		// }
	};

	return (
		<SafeAreaView>
			<TouchableOpacity onPress={signout}>
				<FontAwesome5
					name="sign-out-alt"
					size={25}
					color="#009999"
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HeaderSignout;
