import mongoose from "mongoose";

//mongoDB configuration
const dbconnection = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
		console.log("successfully connected to database", connect.connection.name, connect.connection.host);
	} catch (err) {
		console.log(err.message);
	}
};

export default dbconnection;
