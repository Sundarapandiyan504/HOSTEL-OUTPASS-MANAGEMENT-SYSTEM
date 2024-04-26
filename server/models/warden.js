const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const wardenSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
    hostel:{type: Array, required: true },
	assign:{type:Array, required: true},
	present:{type: String, required: true },
    mobile: { type: Number, required: true },
	img: {
		data: Buffer,
		contentType: String
	  }
});

wardenSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Warden = mongoose.model("warden", wardenSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: Joi.required().label("Password"),
		
	});
	return schema.validate(data);
};

module.exports = { Warden, validate };
