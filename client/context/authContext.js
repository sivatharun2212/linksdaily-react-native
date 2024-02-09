import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [registeredUserEmail, setRegisteredUserEmail] = useState("");

	useEffect(() => {
		const loadFromAsyncStorage = async () => {
			let data = await AsyncStorage.getItem("@registeredUserEmail");
			setRegisteredUserEmail(data);
		};
		loadFromAsyncStorage();
	}, []);

	return <AuthContext.Provider value={[registeredUserEmail, setRegisteredUserEmail]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
