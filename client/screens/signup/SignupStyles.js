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
	toLogin: {
		fontSize: 16,
	},
	touchOp: {
		backgroundColor: "#009999",
		height: 50,
		marginHorizontal: 20,
		marginTop: 10,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		fontSize: 18,
		color: "#fff",
	},
});

export default SignupStyles;
