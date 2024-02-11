import jsonwebtoken from "jsonwebtoken";

const validateUserToken = async (req, res, next) => {
	let token = "";
	let authHeader = req.header("Authorization");
	try {
		if (authHeader && authHeader.startsWith("Bearer")) {
			token = authHeader.split(" ")[1];
			const validUser = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
			req.user = {
				_id: validUser._id,
				email: validUser.email,
			};
			next();
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

export default validateUserToken;
