import nodemailer from "nodemailer";

//6 digit otp generation function
const genrateOtp = () => {
	let otp = "";
	for (let i = 0; i < 6; i++) {
		const number = Math.floor(Math.random() * 10);
		otp += number;
	}
	return otp;
};

//nodemailer transporter initialization
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_SENDER,
		pass: process.env.EMAIL_APP_PASSWORD,
	},
});

//send email function
export const sendEmail = async (email) => {
	const otp = genrateOtp();
	try {
		const info = await transporter.sendMail({
			from: {
				name: "linksdaily",
				email: process.env.EMAIL_SENDER,
			},
			to: email,
			subject: "OTP to reset password.",
			text: `use this code to reset your password. ${otp}`,
		});
		return { otp, info };
	} catch (error) {
		console.log(error.message);
		return null;
	}
};
