import nodemailer from "nodemailer";

const genrateOtp = () => {
	let otp = "";
	for (let i = 0; i < 6; i++) {
		const number = Math.floor(Math.random() * 10);
		otp += number;
	}
	return otp;
};

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "bymistakeborn@gmail.com",
		pass: "ikgjawtbyqqqcpgg",
	},
});

export const sendEmail = async (email) => {
	const otp = genrateOtp();
	try {
		const info = await transporter.sendMail({
			from: {
				name: "linksdaily",
				email: "bymistakeborn@gmail.com",
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
