import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/authContext";
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import ResetPassword from "./screens/resetPassword/ResetPassword";

const stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<stack.Navigator
					initialRouteName="login"
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
					<stack.Screen
						name="reset-password"
						component={ResetPassword}
					/>
				</stack.Navigator>
			</AuthProvider>
		</NavigationContainer>
	);
}
