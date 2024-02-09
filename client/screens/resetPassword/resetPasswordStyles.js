import { StyleSheet } from "react-native";

export const resetPasswordStyles = StyleSheet.create({
	cont: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: 380,
		borderWidth: 1,
		height: 50,
		fontSize: 20,
		paddingLeft: 10,
		borderRadius: 10,
		marginBottom: 30,
	},
	btnWrapper: {
		backgroundColor: "#009999",
		height: 50,
		width: 380,
		marginHorizontal: 20,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	sendBtn: {
		fontSize: 18,
		color: "#fff",
	},
});
