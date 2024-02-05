import { View, Text, TextInput } from "react-native";
import inputStyles from "./inputStyles";

const UserInput = ({ label, value, setValue, autoCapitalize, secureTextEntry }) => {
	return (
		<View style={inputStyles.inputBox}>
			<Text style={inputStyles.label}>{label}</Text>
			<TextInput
				style={inputStyles.input}
				onChangeText={(text) => setValue(text)}
				value={value}
				autoComplete="off"
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
};

export default UserInput;
