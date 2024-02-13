import { StyleSheet } from "react-native";

const updateDetailsStyles = StyleSheet.create({
	cont: {
		flex: 1,
	},
	updateSection: {
		flex: 1,
		padding: 30,
	},
	updateCont: {
		borderRadius: 20,
		overflow: "hidden",
	},
	updateTitleCont: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#fff",
	},
	lastUpdateTitleCont: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#fff",
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "400",
	},
	innerUpdateCont: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15,
		gap: 10,
		width: "90%",
		backgroundColor: "#d6d6d6",
		alignSelf: "center",
	},
	lastInnerUpdateCont: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15,
		gap: 10,
		width: "90%",
		backgroundColor: "#d6d6d6",
		alignSelf: "center",
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
	},
	Input: {
		borderWidth: 1,
		width: "90%",
		height: 50,
		fontSize: 18,
		paddingLeft: 10,
		borderRadius: 10,
	},
	Button: {
		width: "90%",
		height: 50,
		borderRadius: 10,
		backgroundColor: "#2d4949",
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: "#fff",
		fontSize: 18,
	},
});

export default updateDetailsStyles;
