import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";

const stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<stack.Navigator
				initialRouteName="signup"
				screenOptions={{ headerShown: false }}>
				<stack.Screen
					name="signup"
					component={Signup}
				/>
				<stack.Screen
					name="login"
					component={Login}
				/>
				<stack.Screen
					name="home"
					component={Home}
				/>
				<stack.Screen
					name="forgot-password"
					component={ForgotPassword}
				/>
			</stack.Navigator>
		</NavigationContainer>
	);
}
