import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [registeredUserEmail, setRegisteredUserEmail] = useState("");
	const [authUserData, setAuthUserData] = useState(null);

	useEffect(() => {
		const loadFromAsyncStorage = async () => {
			let registeredEmail = await AsyncStorage.getItem("@registeredUserEmail");
			setRegisteredUserEmail(registeredEmail);
			let userDataToken = await AsyncStorage.getItem("@AuthenticationUserData");
			setAuthUserData(JSON.parse(userDataToken));
		};
		loadFromAsyncStorage();
	}, []);

	return <AuthContext.Provider value={[registeredUserEmail, setRegisteredUserEmail, authUserData, setAuthUserData]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
