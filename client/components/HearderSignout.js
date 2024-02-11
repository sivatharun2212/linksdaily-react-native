import React, { useContext } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";

const HeaderSignout = () => {
	const [registeredUserEmail, setRegisteredUserEmail] = useContext(AuthContext);
	const [authUserData, setAuthUserData] = useContext(AuthContext);
	const signout = async () => {
		setRegisteredUserEmail("");
		setAuthUserData(null);
		await AsyncStorage.removeItem("@registeredUserEmail");
		await AsyncStorage.removeItem("@authenticatedUserData");
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
