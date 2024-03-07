import { Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import navStyles from "./navStyles";

const ToolTip = ({ label, name, size, solid, onPress, screenName }) => {
	const activeScreen = label.toLowerCase() === screenName;
	return (
		<TouchableOpacity
			onPress={onPress}
			style={navStyles.tooltipCont}>
			<FontAwesome5
				name={name}
				size={size}
				color={activeScreen ? "#009999" : "#00999969"}
				solid={solid}
			/>
			<Text style={navStyles.tooltipTitle}>{label}</Text>
		</TouchableOpacity>
	);
};

const NavToolBar = ({ navigation }) => {
	const route = useRoute();
	return (
		<>
			<Divider />
			<View style={navStyles.cont}>
				<ToolTip
					label="Home"
					name="home"
					size={25}
					solid={false}
					onPress={() => navigation.navigate("home")}
					screenName={route.name}
				/>
				<ToolTip
					label="Post"
					name="plus-square"
					size={25}
					solid={true}
					onPress={() => navigation.navigate("post")}
					screenName={route.name}
				/>
				<ToolTip
					label="Links"
					name="th-list"
					size={25}
					solid={false}
					onPress={() => navigation.navigate("links")}
					screenName={route.name}
				/>
				<ToolTip
					label="Me"
					name="user"
					size={25}
					solid={true}
					onPress={() => navigation.navigate("me")}
					screenName={route.name}
				/>
			</View>
		</>
	);
};

export default NavToolBar;
