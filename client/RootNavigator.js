import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import ResetPassword from "./screens/resetPassword/ResetPassword";
import { AuthContext } from "./context/authContext";
import { useContext, useEffect } from "react";
import Me from "./screens/me/Me";
import Post from "./screens/post/Posts";
import Links from "./screens/links/Links";
import UpdateDetails from "./screens/updateDetails/UpdateDetails";

import { useSelector } from "react-redux";
const stack = createNativeStackNavigator();

const RootNavigator = () => {
	const authUserData = useSelector((state) => state.authUser);

	const authenticated =
		authUserData !== null && authUserData.token !== "" && authUserData.userData !== null;
	return (
		<stack.Navigator
			initialRouteName="login"
			screenOptions={{ headerShown: true }}>
			{authenticated ? (
				<>
					<stack.Screen
						name="home"
						component={Home}
						options={{
							title: "Linksdaily",
						}}
					/>
					<stack.Screen
						name="me"
						component={Me}
						options={{
							title: "Account",
						}}
					/>
					<stack.Screen
						name="links"
						component={Links}
					/>
					<stack.Screen
						name="post"
						component={Post}
					/>
					<stack.Screen
						name="update-details"
						component={UpdateDetails}
						options={{
							title: "Update Details",
						}}
					/>
				</>
			) : (
				<>
					<stack.Screen
						name="signup"
						component={Signup}
					/>
					<stack.Screen
						name="login"
						component={Login}
					/>

					<stack.Screen
						name="forgot-password"
						component={ForgotPassword}
					/>
					<stack.Screen
						name="reset-password"
						component={ResetPassword}
					/>
				</>
			)}
		</stack.Navigator>
	);
};

export default RootNavigator;
