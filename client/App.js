import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import { store } from "./app/store";
import { Provider } from "react-redux";
export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<RootNavigator />
			</Provider>
		</NavigationContainer>
	);
}
