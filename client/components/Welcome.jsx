import { Text, View } from "react-native";

const Welcome = ({ name }) => {
	return (
		<View>
			<Text>welcome {name}</Text>
		</View>
	);
};

export default Welcome;
