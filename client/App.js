import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/authContext";
import RootNavigator from "./RootNavigator";

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<RootNavigator />
			</AuthProvider>
		</NavigationContainer>
	);
}
