import { StyleSheet } from "react-native";

const meStyles = StyleSheet.create({
	cont: {
		flex: 1,
		// backgroundColor: "#71d1ac",
		justifyContent: "space-between",
	},
	meSection: {
		flex: 1,
		// backgroundColor: "#aeb352",
	},
	imageCont: {
		width: 160,
		height: 160,
		// backgroundColor: "#456456",
		borderWidth: 3,
		borderColor: "#997a00",
		borderRadius: 100,
		alignSelf: "center",
		marginTop: 100,
		overflow: "hidden",
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	editImgCont: {
		width: 40,
		height: 40,
		backgroundColor: "#e6ffff",
		position: "absolute",
		top: 210,
		left: 250,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "#997a00",
	},
});

export default meStyles;
