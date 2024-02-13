import { StyleSheet } from "react-native";

const accOptStyles = StyleSheet.create({
	optCont: {
		backgroundColor: "#fff",
		flex: 1,
		width: "100%",
		marginTop: 30,
		paddingTop: 40,
		paddingBottom: 60,
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
	},
	option: {
		flexDirection: "row",
		padding: 18,
		gap: 12,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	iconCont: {
		alignItems: "center",
		justifyContent: "center",
		width: 35,
		height: 35,
	},
	titleText: {
		fontSize: 18,
		fontWeight: "500",
	},
});

export default accOptStyles;
