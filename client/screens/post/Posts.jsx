import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import NavToolBar from "../../components/nav/Nav";
import postStyles from "./postStyles";

const Post = ({ navigation }) => {
	return (
		<View style={postStyles.cont}>
			<View style={postStyles.postSection}>
				<Text style={{ fontSize: 25 }}>post page</Text>
			</View>
			<NavToolBar navigation={navigation} />
		</View>
	);
};

export default Post;
