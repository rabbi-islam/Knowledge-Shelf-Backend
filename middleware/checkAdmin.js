const { throwError } = require("../utils/throwError");

const checkAdmin = (req, res, next) => {
	const user = req.user;

	if (!user) {
		throwError("Not an authenticated user", 403); // Unauthorized
	}

	if (user.role === "admin") {
		next();
	} else {
		throwError("User is not an admin", 403);
	}
};

module.exports = checkAdmin;