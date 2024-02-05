import { Text, TouchableOpacity } from "react-native";
import ButtonStyles from "./ButtonStyles";
const Button = ({ title, handleSubmit, loading }) => {
	return (
		<TouchableOpacity
			onPress={handleSubmit}
			style={ButtonStyles.touchOp}>
			{loading ? <Text style={ButtonStyles.button}>Hold Up!</Text> : <Text style={ButtonStyles.button}>{title}</Text>}
		</TouchableOpacity>
	);
};

export default Button;
