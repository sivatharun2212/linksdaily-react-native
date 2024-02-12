import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext } from "react";

//initialize auth context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	//state variables
	const [authUserData, setAuthUserData] = useState({
		registeredUserEmail: "",
		token: "",
		userData: null,
	});

	//load async storage data in context variables
	useEffect(() => {
		const loadFromAsyncStorage = async () => {
			let registeredEmail = await AsyncStorage.getItem("@RUE");
			if (registeredEmail) {
				setAuthUserData((prevState) => ({ ...prevState, registeredUserEmail: registeredEmail }));
			}

			let userDataToken = await AsyncStorage.getItem("@AUD");
			if (userDataToken) {
				try {
					userDataToken = JSON.parse(userDataToken);
					setAuthUserData((prevState) => ({
						...prevState,
						token: userDataToken?.token,
						userData: userDataToken?.userData,
					}));
				} catch (error) {
					console.error("Error parsing userDataToken:", error);
				}
			}
		};
		loadFromAsyncStorage();
	}, []);

	return <AuthContext.Provider value={[authUserData, setAuthUserData]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
