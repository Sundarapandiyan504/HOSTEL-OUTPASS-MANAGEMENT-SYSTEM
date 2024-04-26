const { Student } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');

const registerStudent = async (req, res) => {
    try {
        // const form = req.body.form;
        const form = JSON.parse(req.body.form);
        
        
        const ID = await Student.findOne({ admission_id: form.admission_id });
        if (ID) {
            return res.json({ message: "User with given Admission ID already Exist!" });
        }
        const user = await Student.findOne({ email: form.email });
        if (user) {
            return res.json({ message: "User with given email already Exist!" });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(form.password, salt);
        console.log("student",form);
        fs.readFile(req.file.path, async (err, data) => {
            if (err) {
                throw err;
            }
            const obj = {
                name: form.name,
                email: form.email,
                password: hashPassword,
                mobile_number: form.mobile,
                parent: form.parent,
                hostel: form.hostel,
                admission_id: form.admission_id,
                course: form.course,
                room_number: form.roomNumber,
                img: {
                    data: data,
                    contentType: req.file.mimetype
                }
            };

            await Student.create(obj);
            // await new Student({
            //     name: form.name,
            //     email: form.email,
            //     password: hashPassword,
            //     mobile_number: form.mobile,
            //     parent: form.parent,
            //     hostel: form.hostel,
            //     admission_id: form.admission_id,
            //     course: form.course,
            //     room_number: form.roomNumber,
            //     img: {
            //         data: data,
            //         contentType: req.file.mimetype
            //     }
            // }).save();
            fs.unlinkSync(req.file.path);
            res.status(201).json({ message: "User created successfully" });
            // res.status(201).json({ message: 'Warden created successfully' });
        });
        
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
}; 

const loginStudent = async (req, res) => {
    try {
        const form = req.body.form;
        const student = await Student.findOne({ email: form.email },"password");
        if (!student) {
            return res.json({ error: 'No student found' });
        }
        const validPassword = await bcrypt.compare(form.password, student.password);
        if (!validPassword) {
            return res.json({ error: 'Password does not match' });
        }
        const token = jwt.sign({ studentId: student._id }, process.env.KEY);
        return res.status(201).json({ message: 'Logged in successfully', token: token, roll: 'student' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const Editstudent = async (req, res) => {
    try {
        const form = req.body.newform;
        const email = req.body.email;
        console.log(form, email);
        if(email===form.email){
            const student = await Student.findOne({ email: email });
            if (!student) {
                return res.status(200).json({ message: 'No student found' });
            }
    
            // Check if the old password matches
            const validPassword = await bcrypt.compare(form.oldpassword, student.password);
            if (!validPassword) {
                // console.log("Password does not match");
                return res.status(200).json({ message: 'old Password does not match' });
            }
    
            // Hash the new password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            // console.log(salt);
            const hashPassword = await bcrypt.hash(form.password, salt);
            // console.log(hashPassword);
            // Update student information
            await Student.findOneAndUpdate(
                { email: form.email },
                { $set: { password: hashPassword } },
                { new: true }
            );
    
            console.log("Email and Password updated successfully");
    
            // Optionally, you can generate a new JWT token here if needed
    
            return res.status(200).json({ message: 'Password updated successfully' });
        }else{

            const tudent = await Student.findOne({ email:form.email },"email password");
            if (tudent) {
                return res.status(200).json({ message: 'No student found' });
            }
            const student = await Student.findOne({ email: email });
            if (!student) {
                return res.status(200).json({ message: 'No student found' });
            }
    
            // Check if the old password matches
            const validPassword = await bcrypt.compare(form.oldpassword, student.password);
            if (!validPassword) {
                // console.log("Password does not match");
                return res.status(200).json({ message: 'old Password does not match' });
            }
    
            // Hash the new password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            // console.log(salt);
            const hashPassword = await bcrypt.hash(form.password, salt);
            // console.log(hashPassword);
            // Update student information
            await Student.findOneAndUpdate(
                { email: email },
                { $set: { password: hashPassword,email:form.email } },
                { new: true }
            );
    
            console.log("Email and Password updated successfully");
    
            // Optionally, you can generate a new JWT token here if needed
    
            return res.status(200).json({ message: 'Password updated successfully' });
        }
        // Find the student by email
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// const fetchStudent = async (req, res) => {
//     try {
//         const { value } = req.body;
//         const ver = jwt.verify(value, process.env.KEY);
//         // console.log(ver);
//         const student = await Student.findOne({ _id: ver.studentId });
//         if (!student) {
//             return res.json({ error: 'No student found' });
//         }
//         // const outpass = student.outpass_history.find(item => {
//         //     if (item.status === 'accept' || item.status === 'out' || item.status === 'waiting') {
//         //         const token = jwt.sign({ data: item.admission_id }, process.env.KEY)
//         //         res.status(202).json({ status: item.status, outpass: token, value: [item],student: student })
//         //     }else if(item.status === 'none'){
//         //         res.status(202).json({ status: "none" ,student: student})
//         //     }else{
//         //         console.log(item.status);
//         //     }})
//         const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
//         const image={img: {
//             data: `${base64Data}`,
//             contentType: student.img.contentType
//         },}
//         console.log("student")

//         res.status(201).json({ message: 'Logged in successfully', student: student,image:image });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });  
//     }
// };


const fetchStudent = async (req, res) => {
    try {
        const { value } = req.body;
        console.log("hvkgvhjv");
        const ver = jwt.verify(value, process.env.KEY);
        const student = await Student.findOne({ _id: ver.studentId });
        
        if (!student) {
            return res.status(404).json({ error: 'No student found' });
        }

        // let outpass = null;
        // if (student.outpass_history.length===0) {
        //     outpass = { status: "none" };
        // }
    //     else{

    //         // console.log(student.outpass_history.length,'iooioio');
    //         for (const item of student.outpass_history) {
    //             // console.log('Item status:', item.status); // Log the status of each item
    //             if (item.status === 'accept' || item.status === 'out' || item.status === 'waiting') {
    //                 const token = jwt.sign({ data: item.admission_id }, process.env.KEY);
    //             outpass = { status: item.status, outpass: token, value: [item] };
    //             console.log("hi");
    //             break;
    //         } else if (item.status === 'none') {
    //             outpass = { status: "none" };
    //             // console.log("hi1");
    //             break;
    //         } else {
    //             outpass = { status: "none" };
                
    //             // console.log("hi2");
    //             // console.log('Unknown status:', item.status); // Log if the status is not recognized
    //         }
            
    //     }
    // }

        // console.log(student.img,"dssss");
        const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
        const image = {
            img: {
                data: base64Data,
                contentType: student.img.contentType
            }
        };
        console.log("kiko");
        res.status(201).json({ message: 'Logged in successfully', student: student, image: image});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};




const checkStudentOutpass = async (req, res) => {
    try {
        const { id } = req.body;
        const student = await Student.findOne({ admission_id: id },"outpass_history");
        if (student) {
            let outpassToken;
            const outpass = student.outpass_history.find(item => {
                return item.status === 'accept' || item.status === 'out' || item.status === 'waiting';
            });
            if (outpass) {
                outpassToken = jwt.sign({ data: outpass.admission_id }, process.env.KEY);
                return res.status(201).json({ status: outpass.status, outpass: outpassToken, value: [outpass] });
            } else {
                return res.status(201).json({ status: "none" }); 
            }
        } else {
            return res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Error" });
    }
};

const fetchStudentWithWaitingStatus = async (req, res) => {
    try {
        const {hostel} = req.body;
        console.log(hostel);
        const student = await Student.find({hostel:hostel});
        if (!student) {
            return res.json({ error: 'No student found' });
        }
        console.log(student);
        const filteredData = student.filter(item => {
            return item.outpass_history.some(history => history.status === "waiting");
        });
        // console.log(filteredData,"hi");
        res.status(201).json({ message: 'std get successfully', student: filteredData });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const fetch = async (req, res) => {
//     try {
//         const student = await Student.find({});
//         if (!student || student.length === 0) {
//             return res.json({ error: 'No students found' });
//         }
//         // console.log(student);
        
//         // Map through each student and include base64Data inside image property
//         const studentsWithImages = student.map(student => {
//             const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
//             const image = {
//                 data: base64Data,
//                 contentType: student.img.contentType
//             };
//             return {...student.toObject(), image} ; // Convert Mongoose document to plain JavaScript object
//         });
//         // console.log(studentsWithImages);
//         console.log("hasdasdsdacas");

//         res.status(201).json({ message: 'Students retrieved successfully', students: studentsWithImages});
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


const fetch = async (req, res) => {
    try {
        // Fetch students with image data from the database
        const students = await Student.find({});

        // If no students found, return an error response
        if (!students || students.length === 0) {
            return res.status(404).json({ error: 'No students found' });
        }

        // Process each student in parallel to include image data
        const studentsWithImages = await Promise.all(students.map(async (student) => {
            const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
            const image = {
                data: base64Data,
                contentType: student.img.contentType
            };
            // Return a plain JavaScript object with image data included
            return {...student.toObject(), image};
        }));
        console.log("ok"); 
        // Send success response with students including image data
        res.status(200).json({ message: 'Students retrieved successfully', students: studentsWithImages});
    } catch (error) {
        // Handle errors
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const fetchStudentsStatus = async (req, res) => {
    try {
        const students = await Student.find({});
        if (!students || students.length === 0) {
            return res.status(204).json({ error: 'No students found' });
        }
        const present = students.map((student, index) => {
            const outStatusData = student.outpass_history.filter((item) => item.status === 'out');
            const waitingStatusData = student.outpass_history.filter((item) => item.status === 'waiting');
            const acceptStatusData = student.outpass_history.filter((item) => item.status === 'accept');
            const inStatusData = student.outpass_history.filter((item) => item.status === 'in');
            const countOutStatus = outStatusData.length;
            const countWaitingStatus = waitingStatusData.length;
            const countAcceptStatus = acceptStatusData.length;
            const countInStatus = inStatusData.length;
            return {
                out: countOutStatus,
                waiting: countWaitingStatus,
                accept: countAcceptStatus,
                in: countInStatus
            };
        });
        let sumOut = 0;
        let sumWaiting = 0;
        let sumAccept = 0;
        let sumIn = 0;
        for (let i = 0; i < present.length; i++) {
            sumOut += present[i].out;
            sumWaiting += present[i].waiting;
            sumAccept += present[i].accept;
            sumIn += present[i].in;
        }
        const studentArray = students.map(student => Object.values(student));
        const length = studentArray.length;
        const total = length - sumOut;
        res.status(201).json({
            message: 'Students retrieved successfully',
            students: [length, total, sumOut, sumWaiting, sumAccept, sumIn]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const fetchStudentStatushostel = async (req, res) => {
    try {
        const {hostel}= req.body
        console.log(hostel,"i am sundar");
        const students = await Student.find({hostel:hostel[0]});
        if (!students || students.length === 0) {
            return res.json({ error: 'No students found' });
        }
        // console.log(students);
        
        const present = students.map((student, index) => {
            const outStatusData = student.outpass_history.filter((item) => item.status === 'out');
            const waitingStatusData = student.outpass_history.filter((item) => item.status === 'waiting');
            const acceptStatusData = student.outpass_history.filter((item) => item.status === 'accept');
            const inStatusData = student.outpass_history.filter((item) => item.status === 'in');
            const countOutStatus = outStatusData.length;
            const countWaitingStatus = waitingStatusData.length;
            const countAcceptStatus = acceptStatusData.length;
            const countInStatus = inStatusData.length;
            return {
                out: countOutStatus,
                waiting: countWaitingStatus,
                accept: countAcceptStatus,
                in: countInStatus
            };
        });
        let sumOut = 0;
        let sumWaiting = 0;
        let sumAccept = 0;
        let sumIn = 0;
        for (let i = 0; i < present.length; i++) {
            sumOut += present[i].out;
            sumWaiting += present[i].waiting;
            sumAccept += present[i].accept;
            sumIn += present[i].in;
        }
        const studentArray = students.map(student => Object.values(student));
        const length = studentArray.length;
        const total = length - sumOut;
        res.status(201).json({
            message: 'Students retrieved successfully',
            students: [length, total, sumOut, sumWaiting, sumAccept, sumIn]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateStudentStatus = async (req, res) => {
    try {
        const { stat } = req.body;
        const { data } = req.body;
        const { sta } = req.body;
        // console.log(data,stat,sta,"sdadada");
      
        // Assuming 'status' contains the desired status value (e.g., 'accept')
        Student.findOneAndUpdate(
          { admission_id: data, 'outpass_history.status': sta },
          { $set: { 'outpass_history.$.status': stat } },
          { new: true },
          (err, updatedStudent) => {
            if (err) {
              res.json({ message: err });
            } else if (!updatedStudent) {
              res.json({ message: 'Student not found or no matching outpass with the specified status.' });
            } else {
              res.status(201).json({ message: 'The Outpass cancelled success' });
            }
          } 
        )
        } catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};

// const checkStudentOutpass = async (req, res) => {
//     try {
//         const { id } = req.body;
//         Student.findOne({ admission_id: id })
//             .then(student => {
//                 if (student) {
//                     const outpass = student.outpass_history.find(item => {
//                         if (item.status === 'accept' || item.status === 'out' || item.status === 'waiting') {
//                             const token = jwt.sign({ data: item.admission_id }, process.env.KEY)
//                             res.status(201).json({ status: item.status, outpass: token, value: [item] })
//                         }
//                     });
                    
//                         res.status(201).json({ status: "none" })
                
//                     // if (!outpass) {
//                     //     res.status(202).json({ status: "none" })
//                     // }
//                 }
//             })  
//             .catch(error => {
//                 console.log(error);
//             });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Error" });
//     }
// };




const createOutpass = async (req, res) => {
    try { 
        const {data} =req.body
		// const {id,name,course,mobile,room,hostel,out,In,reason} = req.body;
        const currentDate = new Date();
		// console.log("try",data.reason);
		const student = await Student.findOneAndUpdate(
			{ admission_id:data.id },
			{ $push: {outpass_history:{
				name: data.name,
				course: data.course,
				hostel: data.hostel,
				admission_id: data.id,
				room_number: data.room,
				mobile_number:data.mobile,
				status:"waiting",
				out:data.out,
				in:data.In,
				reason:data.reason,
                created_at: currentDate,
                studentout:"",
                studentin:""
			}} },
			{ new: true } 
		  ).then(async()=>{
			console.log("get delete");
		  })
		
		console.log("data send");
	// 	if(student){
	// 	console.log(student);
	// }
	res.status(201).json({ message: "outpass created successfully" });
} catch (error) {
	// console.log(error,"ji");
	res.json({ message: "Internal Error" });
}
};

const updateOutpassHistory = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data);
        const student = await Student.findOneAndUpdate(
            { admission_id: data.id },
            { $push: { outpass_history: data } },
            { new: true }
        );
        res.status(201).json({ message: "outpass created successfully" });
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
};

const rejectOutpass = async (req, res) => {
    try {
        const { status } = req.body;
        const { reject } = req.body;
        const { data } = req.body
        console.log("rear", typeof reject, data)
        Student.findOneAndUpdate(
            { admission_id: data.admission_id, 'outpass_history.status': 'waiting' },
            { $set: { 'outpass_history.$.status': status, 'outpass_history.$.reject': reject } },
            { new: true },
            (err, updatedStudent) => {
                if (err) {
                    res.json({ message: err });
                } else if (!updatedStudent) {
                    res.json({ message: 'Student not found or no matching outpass with the specified status.' });
                } else {
                    updatedStudent.save((err) => {
                        if (err) {
                            res.json({ message: 'Error adding "reject" entry.' });
                        } else {
                            console.log(updatedStudent);
                            res.status(201).json({ message: 'Change student status and added "reject" entry to outpass history successfully' });
                        }
                    });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Error" });
    }
};

const acceptOutpass = async (req, res) => {
    try { 
        // console.log("asldslmdsaldmasldmaslmd");
        const {status} = req.body;
        const {data} =req.body
        // console.log("rear",hostel)	
		Student.findOneAndUpdate(
			{ admission_id: data, 'outpass_history.status': "waiting" },
			{ $set: { 'outpass_history.$.status': status} }, 
			{ new: true },
			(err, updatedStudent) => {
			  if (err) {
				res.json({ message: err });
			  } else if (!updatedStudent) {
				res.json({ message: 'Student not found or no matching outpass with the specified status.' });
			  } else {
				res.status(201).json({ message: 'Change student status success' });
			  }
			}
		  );
		
		console.log("data send");
	// 	if(student){
	// 	console.log(student);
	// }
	// res.status(201).json({ message: "outpass created successfully" });
} catch (error) {
	// console.log(error,"ji");
	console.log(error);
	res.json({ message: "Internal Error" });
}

};

// const acceptOutpass = async (req, res) => {
//     try { 
//         const {status} = req.body;
//         // const {reject} = req.body;
//         const {data} =req.body
//         console.log("rear",status,data)	
// 		Student.findOneAndUpdate(
// 			{ admission_id: data, 'outpass_history.status': "waiting" },
// 			{ $set: { 'outpass_history.$.status': status} }, 
// 			{ new: true },
// 			(err, updatedStudent) => {
// 			  if (err) {
// 				res.json({ message: err });
// 			  } else if (!updatedStudent) {
// 				res.json({ message: 'Student not found or no matching outpass with the specified status.' });
// 			  } else {
// 				res.status(201).json({ message: 'Change student status success' });
// 			  }
// 			}
// 		  );
		
// 		console.log("data send");
// 	// 	if(student){
// 	// 	console.log(student);
// 	// }
// 	// res.status(201).json({ message: "outpass created successfully" });
// } catch (error) {
// 	// console.log(error,"ji");
// 	console.log(error);
// 	res.json({ message: "Internal Error" });
// }

// };

const getRejectedOutpasses = async (req, res) => {
    try {
        const { status } = req.body;
        const { data } = req.body
        console.log("rear", status, data)
        Student.findOneAndUpdate(
            { admission_id: data, 'outpass_history.status': "rejected" },
            { new: true },
            (err, updatedStudent) => {
                if (err) { 
                    res.json({ message: err });
                } else if (!updatedStudent) {
                    res.json({ message: 'NO Rejected OUTPASS FOUND' });
                } else {
                    const rejectedOutpasses = updatedStudent.outpass_history.filter(entry => entry.status === 'rejected');
                    console.log(rejectedOutpasses,"ssfsdfsfs");
                    res.status(201).json({ message: 'REJECTED OUTPASS GET SUCCESSFULLY', data: rejectedOutpasses });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Error" });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    fetchStudent,
    fetchStudentWithWaitingStatus,
    fetchStudentsStatus,
    updateStudentStatus,
    checkStudentOutpass,
    createOutpass,
    updateOutpassHistory,
    rejectOutpass,
    acceptOutpass,
    getRejectedOutpasses,
    fetchStudentStatushostel,
    fetch,
    Editstudent
};
