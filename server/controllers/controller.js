




exports.wardenlogin = async (req, res) => {
	  
	try {  
		const form =req.body.form
	console.log("student",form.email);
		const ID = await Student.findOne({ admission_id: form.admission_id });
		if (ID){
			return res.json({ message: "User with given Admission ID already Exist!" });
		}
		const user = await Student.findOne({ email: form.email });
		if (user){
			return res.json({ message: "User with given email already Exist!" });
		}
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(form.password, salt);
		new Student({
			name:form.name,
			email:form.email, 
			password: hashPassword,
			mobile_number:form.mobile,
			hostel:form.hostel,
			admission_id:form.admission_id,
			course:form.course,
			room_number:form.roomNumber
		}).save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.json({ message: "Internal Error" });
	}
}