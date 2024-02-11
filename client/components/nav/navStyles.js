import { StyleSheet } from "react-native";

const navStyles = StyleSheet.create({
	cont: {
		// backgroundColor: "#db5a83",
		flexDirection: "row",
		height: 80,
		justifyContent: "space-between",
		// marginHorizontal: 10,
		alignItems: "space-between",
		paddingBottom: 10,
	},
	tooltipTitle: {
		fontSize: 16,
		fontWeight: "500",
	},
	tooltipCont: {
		// backgroundColor: "#7452b3",
		width: "25%",
		alignItems: "center",
	},
});

export default navStyles;
