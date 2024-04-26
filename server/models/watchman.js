const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



const securitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	mobile_number: { type: Number, required: true }
});

securitySchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Watchman = mongoose.model("watchman", securitySchema);


module.exports = { Watchman };
