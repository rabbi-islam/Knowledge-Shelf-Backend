const jwt = require("jsonwebtoken");

const getNewTokens = (user) => {
	const accessToken = jwt.sign(
		{
			_id: user._id,
			fullName: user.fullName,
			email: user.email
		},
		process.env.SECRET_KEY,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		}
	);

	const refreshToken = jwt.sign(
		{
			_id: user._id,
			fullName: user.fullName,
			email: user.email
		},
		process.env.REFRESH_SECRET_KEY,
		{
			expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
		}
	);

	return { accessToken, refreshToken };
};

module.exports = getNewTokens;