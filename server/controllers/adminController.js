const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin');
const { Student } = require("../models/user");
// const Jimp = require('jimp');
// const imageSchema = require('../models/model')
const fs = require('fs');

// Controller method to register a new admin
const registerAdmin = async (req, res) => {
    try {
        // const { name, email, password } = req.body;
        const name ="Admin"
        const email="Admin@gmail.com"
        const password="123"
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// registerAdmin()

const admin =async () =>{ 
    const salt =await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword =await bcrypt.hash("123", salt);
    new Admin({name:"admin",email:"Admin@gmail.com",password:hashPassword}).save()
    .then((admin)=>{
        console.log("Admin created successfully");
        // res.status(201).json({ message: "Admin created successfully" });
    }) 
    // .catch((err)=>{ 
    //     console.log(err);
    // })
    }


    const deletestudent = async (req, res) => {
        try {
            const { id } = req.body;
            console.log("Received id:", id);
    
            // Assuming Student is your Mongoose model
            const result = await Student.deleteOne({ _id: id });
            console.log("Deletion result:", result);
    
            if (result.deletedCount === 1) {
                res.status(201).json({ message: 'Student deleted successfully' });
            } else {
                res.status(204).json({ message: 'Student not found' });
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            res.status(500).json({ message: error.message });
        }
    };
    
    // admin()
// Controller method to login an admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.json({ error: 'No admin found' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.json({ error: 'Password does not match' });
        }

        // Create a JWT token and set it as a cookie
        const token = jwt.sign({ adminId: admin._id }, process.env.KEY);
        res.status(201).json({ message: 'Logged in successfully', token, roll: "admin" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// const fetch = async (req, res) => {
//     try {
//         console.log("hosteletrrg");
//         const student = await Student.find({});
//         if (!student || student.length === 0) {
//             return res.json({ error: 'No students found' });
//         }

//         const studentsWithCompressedImages = await Promise.all(student.map(async student => {
//             // Load image with Jimp
//             const image = await Jimp.read(student.img.data.buffer);
            
//             // Compress image
//             image.resize(50, Jimp.AUTO); // Adjust width as needed

//             // Convert image to base64
//             const base64Data = await image.getBase64Async(Jimp.MIME_JPEG);

//             const compressedImage = {
//                 data: base64Data,
//                 contentType: student.img.contentType
//             };
//             console.log(compressedImage);
//             return { ...student.toObject(), image: compressedImage };
//         }));
//         // console.log(studentsWithCompressedImages);

//         res.status(201).json({ message: 'Students retrieved successfully', students: studentsWithCompressedImages});
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


const fetch = async (req, res) => {
    try {
        console.log("hahahah");
	// Student.find({})
	// .then((data, err)=>{
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log("mmmmmmmmm");
    //     // console.log(data);
    // res.status(200).json(data)
	// 	// res.render('imagepage',{items: data})
	// })
        // const hostel = req.body.value
        // console.log("hosteletrrg");
        // // const student = await Student.find({},"name email password course hostel admission_id room_number mobile_number parent outpass_history");
        const student = await Student.find({});
        if (!student || student.length === 0) {
            return res.json({ error: 'No students found' });
        }
        console.log("student");

        const studentsWithImages = student.map(student => {
            const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
            const image = {
                data: base64Data,
                contentType: student.img.contentType
            };
            return {...student.toObject(), image} ; 
        });
        // console.log(studentsWithImages);

        res.status(201).json({ message: 'Students retrieved successfully', students: studentsWithImages});
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const report = async (req, res) => {
    const { fromDate, toDate ,selectedOption} = req.body;
    console.log(selectedOption);
    try {
        const filteredOutpasses = await Student.aggregate([
            { $unwind: "$outpass_history" }, 
            {
                $match: {
    [`outpass_history.${selectedOption}`]: {
                        $gte: new Date(fromDate),
                        $lte: new Date(toDate) 
                    },
                    $nor: [
                        { "outpass_history.status": "cancel" },
                        { "outpass_history.status": "rejected" }
                    ]
                }
            },
            {
                $replaceRoot: { newRoot: "$outpass_history" } 
            }
        ]);   

        console.log("koooooo",filteredOutpasses,fromDate, toDate);
    
    if (filteredOutpasses.length === 0) {
        return res.status(204).json({message:"no student found"});
    } else {
        
        return res.status(201).json(filteredOutpasses);
    }
  } catch (error) {
    console.error('Error filtering data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const adminfetch = async (req, res) => {
//     try {
//         const {value}= req.body;
//         const ver = jwt.verify(value, process.env.KEY);
//         console.log(ver, "fssodoa");
//         const admin = await Admin.findOne({ _id: ver.adminId });
//         if (!admin) {
//             return res.json({
//                 error: 'No admin found'
//             });
//         }
//         res.status(201).json({ message: 'Logged in successfully', admin: admin });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const adminfetch = async (req, res) => {
//     try {
//         const { value, type } = req.body;

//         const ver = jwt.verify(value, process.env.KEY);
//         console.log(ver, "fssodoa");
//         const admin = await Admin.findOne({ _id: ver.adminId });
//         if (!admin) {
//             return res.json({ error: 'No admin found' });
//         }

//         // console.log("jijiji");

//         const students = await Student.find({});
//         if (!students || students.length === 0) {
//             return res.status(204).json({ error: 'No students found' });
//         }

//         const counts = students.reduce((acc, student) => {
//             student.outpass_history.forEach(item => {
//                 acc[item.status]++;
//             });
//             return acc;
//         }, { out: 0, waiting: 0, accept: 0, in: 0 });

//         const totalStudents = students.length;
//         const totalOut = counts.out;
//         const totalWaiting = counts.waiting;
//         const totalAccept = counts.accept;
//         const totalIn = counts.in;

//         const total = totalStudents - totalOut;

//         res.status(201).json({ message: 'Logged in successfully', admin, students: [totalStudents, total, totalOut, totalWaiting, totalAccept, totalIn] });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const adminfetch = async (req, res) => {
    try {
        const { value, type } = req.body;

        const ver = jwt.verify(value, process.env.KEY);
        console.log(ver, "fssodoa");
        const admin = await Admin.findOne({ _id: ver.adminId });
        if (!admin) {
            return res.json({ error: 'No admin found' });
        }

        res.status(201).json({ message: 'Logged in successfully', admin });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const studentsfetch = async (req, res) => {
    try {
        console.log("ijijiji");
        const students = await Student.find({},'name outpass_history');
        if (!students || students.length === 0) {
            return res.status(204).json({ error: 'No students found' });
        }

        const counts = students.reduce((acc, student) => {
            student.outpass_history.forEach(item => {
                acc[item.status]++;
            });
            return acc;
        }, { out: 0, waiting: 0, accept: 0, in: 0 });

        const totalStudents = students.length;
        const totalOut = counts.out;
        const totalWaiting = counts.waiting;
        const totalAccept = counts.accept;
        const totalIn = counts.in;

        const total = totalStudents - totalOut;

        res.status(201).json({ students: [totalStudents, total, totalOut, totalWaiting, totalAccept, totalIn] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const fetchStudent = async (req, res) => {
    try {
        const { id } = req.body;
        console.log("sundar", id);
        const student = await Student.find({ admission_id: id });
        if (student.length === 0) {
            console.log("empty");
            return res.json({
                message: 'No student found'
            });
        } else {
            console.log("full", student);
            return res.status(201).json({ student: student });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const studentedit = async (req, res) => {
   
    try {
        // const form = req.body.form;
        const form = JSON.parse(req.body.form);
        const id = JSON.parse(req.body.id);
        console.log(form,id);

        
        fs.readFile(req.file.path, async (err, data) => {
            if (err) {
                throw err;
            }
            const imgData = {
                data: data,
                contentType: req.file.mimetype
            };
            console.log(data);
            // await Student.findOneAndUpdate(
            //     { admission_id:id },
            //     { $set: form, $addToSet: { img: imgData } }, 
            //     { new: true }
            // );
            
            fs.unlinkSync(req.file.path)
    })
        // const ID = await Student.findOne({ admission_id: form.admission_id });
        // if (ID) {
        //     return res.json({ message: "User with given Admission ID already Exist!" });
        // }
        // const user = await Student.findOne({ email: form.email });
        // if (user) {
        //     return res.json({ message: "User with given email already Exist!" });
        // }
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = await bcrypt.hash(form.password, salt);
        // console.log("student",form);
        // fs.readFile(req.file.path, async (err, data) => {
        //     if (err) {
        //         throw err;
        //     }
        //     const obj = {
        //         name: form.name,
        //         email: form.email,
        //         password: hashPassword,
        //         mobile_number: form.mobile,
        //         parent: form.parent,
        //         hostel: form.hostel,
        //         admission_id: form.admission_id,
        //         course: form.course,
        //         room_number: form.roomNumber,
                // img: {
                //     data: data,
                //     contentType: req.file.mimetype
                // }
        //     };
        //     const student = await Student.findOneAndUpdate(
        //         {  admission_id: id },
        //         { $set: filledData },
        //         { new: true }
        //     )
        //     await Student.create(obj);
           
        //     fs.unlinkSync(req.file.path);
        //     res.status(201).json({ message: "User created successfully" });
        //     // res.status(201).json({ message: 'Warden created successfully' });
        // });
        
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
};
const studente = async (req, res) => {
    try {
        const { filledData } = req.body;
        const {id}=req.body
        
        // console.log("sundar", filledData);
        // const student = await Student.findOne({email},"email")
        // if(email){
        //     res.status(200).json({message:""})
        // }
      
       
            const student = await Student.findOneAndUpdate(
                {  admission_id: id },
                { $set: filledData },
                { new: true }
            )
            
        
    //     const student = await Student.find({ admission_id: id });
    //     if (student.length === 0) {
    //         console.log("empty");
    //         return res.json({
    //             message: 'No student found'
    //         });
    //     } else {
    //         console.log("full", student);
    //         return res.status(201).json({ student: student });
    //     }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
    adminfetch,
    fetchStudent,
    deletestudent,
    report,
    studentsfetch,
    fetch,
    studentedit,
    studente
};
