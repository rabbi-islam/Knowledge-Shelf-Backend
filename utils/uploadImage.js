const cloudinary = require("../utils/cloudinaryInit");


async function uploadImageHandler(file, destination) {
	let uploadImage = {};

	if (file) {
		console.log("File path:", file.path);
		uploadImage = await cloudinary.uploader.upload(file.path, {
			folder: destination,
		});
	}

	return uploadImage;
}

module.exports = { uploadImageHandler };
