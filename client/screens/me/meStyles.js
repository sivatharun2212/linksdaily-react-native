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
	userInfo: {
		height: "100%",
		backgroundColor: "#095353",
		borderTopRightRadius: 60,
		borderTopLeftRadius: 60,
		flex: 1,
		marginTop: 30,
		paddingVertical: 40,
		alignItems: "center",
	},
	userName: {
		color: "#fff",
		fontSize: 25,
		fontWeight: "700",
		paddingBottom: 6,
	},
	userEmail: {
		color: "#cac8c8",
		fontSize: 18,
	},
});

export default meStyles;
