const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const outpass_history = new mongoose.Schema({
	name: String,
	email: String,
	amount: Number,
	date: Date,
	type: String,
	total: Number,
  });
const studentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	course: { type: String, required: true },
	hostel: { type: String, required: true },
	admission_id: { type: String, required: true },
	room_number: { type: String, required: true },
	mobile_number: { type: Number, required: true },
	parent: { type: Number, required: true },
	outpass_history:[{}],
	img: {
		data: Buffer,
		contentType: String
	  }
});

studentSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
	const schema = Joi.object({ 
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		
	});
	return schema.validate(data);
};

module.exports = { Student, validate };
