import { StyleSheet } from "react-native";

const SignupStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 30,
		color: "#333",
		textAlign: "center",
		fontWeight: "500",
	},
	brandLogoCont: {
		alignItems: "center",
		marginBottom: 20,
	},
	logo: {
		width: 150,
		height: 180,
	},
	forgot: {
		fontSize: 16,
		marginHorizontal: 20,
		marginTop: 10,
		color: "#997a00",
	},
	toSignup: {
		fontSize: 16,
	},
});

export default SignupStyles;
