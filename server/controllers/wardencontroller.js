const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Warden } = require('../models/warden');
const { Student } = require("../models/user");

const fs = require('fs');
// Controller method to register a new warden
const registerWarden = async (req, res) => {
    try {
        // const {form}=req.body;
        const form = JSON.parse(req.body.form);
         console.log(form.name)
         const name=form.name
         const email=form.email
         const password=form.password
         const mobile=form.mobile
         const hostel=form.hostel
        // const { name, email, password, mobile, hostel } = form;
        console.log(name, email, password, mobile, hostel);
        // Check if warden already exists
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const existingWarden = await Warden.findOne({ email }); 
        if (existingWarden) { 
            return res.status(400).json({ message: 'Warden already exists' });
        }
        console.log("lk");
        
        

        const newWarden = new Warden({
            name, 
            email,
            password: hashedPassword,
            mobile,
            hostel:[hostel], 
            assign:[],
            present:"yes",
            img: {
                data: fs.readFileSync(req.file.path),
                contentType:req.file.mimetype
              } 
        });
 
        // Save the warden to the database
        await newWarden.save(); 
        // fs.unlinkSync(req.file.path); 
        console.log("hihi");
        res.status(201).json({ message: 'Warden created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller method to login a warden
const loginWarden = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("bjbjbj");
        // Check if warden exists
        const warden = await Warden.findOne({ email },"password hostel");
        if (!warden) {
            return res.json({ error: 'Warden not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, warden.password);
        if (!isMatch) {
            return res.json({ error: 'password not match' });
        }
        

        // Generate JWT token
        console.log(warden,"ssssssssaaaaaa");
        const token = jwt.sign({ id: warden._id }, process.env.KEY);
        res.status(201).json({ message: 'Logged in successfully',token:token,roll:"warden",hostel:warden.hostel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const fetch = async (req, res) => {
    try {
        const hostel = req.body.value
        console.log("hosteletrrg");
        const student = await Student.find({hostel});
        if (!student || student.length === 0) {
            return res.json({ error: 'No students found' });
        }
        // console.log(student);

        // Map through each student and include base64Data inside image property
        const studentsWithImages = student.map(student => {
            const base64Data = Buffer.from(student.img.data.buffer).toString('base64');
            const image = {
                data: base64Data,
                contentType: student.img.contentType
            };
            return {...student.toObject(), image} ; // Convert Mongoose document to plain JavaScript object
        });
        // console.log(studentsWithImages);

        res.status(201).json({ message: 'Students retrieved successfully', students: studentsWithImages});
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const wardenfetch = async (req, res) => {
    try {
        const {value}= req.body;
        const ver = jwt.verify(value, process.env.KEY);
        console.log(ver.id, "fssodoa");

        const warden = await Warden.findOne({ _id: ver.id });
        if (!warden) {
            return res.json({
                error: 'No warden found'
            });
        }
        // const data=warden
        // console.log("dgsdgsd",warden.img.contentType);
        // const base64Items = data.map((item,index) => {
        //     // console.log(item);
            const base64Data = Buffer.from(warden.img.data.buffer).toString('base64');
        //     // console.log(base64Data);
        //     return {
        //     //   img: {
        //     //     data: `${base64Data}`,
        //     //     contentType: item.img.contentType
        //     //   },
        //       name:item.name, 
        //       email:item.email,
        //       hostel:item.hostel,
        //       mobile:item.mobile
        //       // other properties
        //     }
        //   });
            // const data1={ name:warden.name, 
            //     email:warden.email,
            //     hostel:warden.hostel,
            //     mobile:warden.mobile}
            // console.log(base64Data);
        // console.log(w);
        const wardendata={
            name:warden.name, 
              email:warden.email,
              hostel:warden.hostel,
              mobile:warden.mobile,
        }
        console.log(wardendata);

        const image={img: {
            data: `${base64Data}`,
            contentType: warden.img.contentType
          },}
        res.status(201).json({ message: 'Logged in successfully', warden: wardendata,image });

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
const wardenhostel = async (req, res) => {
    try {
        const warden = await Warden.find({})
        console.log("warden")
        // console.log("warden",warden[0].img);
        if (!warden) {
            return res.json({
                error: 'No warden found'
            });
        }

        const combinedData = warden.map((warden)=>{
            // console.log(warden.img.contentType);
            const base64Data = Buffer.from(warden.img.data.buffer).toString('base64');
            const image={img: {
                data: `${base64Data}`,
                contentType: warden.img.contentType
              },}

              const combinedData = {
                  wardenName: warden.name.trim(),
                  hostelName: warden.hostel,
                  email:warden.email,
                assign:warden.assign,
                present:warden.present,
                image:image
            }
            return combinedData
        })

        const hostelNames = warden.flatMap(warden => warden.hostel);
        res.status(201).json({ message: 'Logged in successfully',hostelNames: hostelNames,warden:combinedData});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const wardenassign = async (req, res) => {
//     try {
//         const { email, value } = req.body;
//         console.log(email, value);

//         // Check if the value is already present in the assign array
//         const warden = await Warden.findOne({ email: email });
//         if (!warden) {
//             return res.status(404).json({ error: 'Warden not found' });
//         }

//         if (warden.assign.includes(value)) {
//             return res.status(400).json({ error: 'Value already exists in the assign array' });
//         }

//         // Update the warden document to push the value into the assign array
//         await Warden.findOneAndUpdate(
//             { email: email },
//             { 
//                 $push: { 
//                     assign: splitted[0] 
//                 },
//                 $set:{
//                     present:"no"
//                 }
//             },
//             { 
//               new: true, // Return the updated document
//               upsert: false // Do not create a new document if it doesn't exist
//             }
//         );
        
//         await Warden.findOneAndUpdate(
//             { email: splitted[1] },
//             { 
//                 $set:{
//                     present:"no"
//                 }
//             },
//             { 
//               new: true, // Return the updated document
//               upsert: false // Do not create a new document if it doesn't exist
//             }
//         );

//         res.status(201).json({ message: "Work assigned successfully" });
          
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const wardenassign = async (req, res) => {
    try {
        const { email, value } = req.body;
        console.log(email, value);
        let splitted = value.split(" ");
        console.log(splitted, splitted[1]);
      
        const bulkOps = [
          {
            updateOne: {
              filter: { email: email },
              update: {
                $push: { assign: splitted[0] },
                $set: { present: "no" }
              },
              upsert: false
            }
          },
          {
            updateOne: {
              filter: { email: splitted[1] },
              update: {
                $set: { present: "no" }
              },
              upsert: false
            }
          }
        ];
      
        await Warden.bulkWrite(bulkOps);
      
        res.status(201).json({ message: "Work Assign successfully" });
      } catch (error) {
        console.error("Error assigning work:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      
};


const wardenfetchAndFetchStudent = async (req, res) => {
    try {
        const { value } = req.body;

        if (value) {
            const ver = jwt.verify(value, process.env.KEY);
            console.log(ver.id, "fssodoa");

            const warden = await Warden.findOne({ _id: ver.id },'hostel assign');
            if (!warden) {
                return res.json({
                    error: 'No warden found'
                });
            }
            const hostel =warden.hostel.concat(warden.assign)
            console.log(hostel);
           
            const students = await Student.find({
                hostel: hostel,
                "outpass_history.status": "waiting"
            },"name email password course hostel admission_id room_number mobile_number parent outpass_history");
            
            if (students.length === 0) {
                return res.status(200).json({ message: 'No student found',hostel });
            }
            
            console.log(students);
            
    
                res.status(201).json({ message: 'Students fetched successfully', student: students ,hostel});
        
        }  else {
            res.status(400).json({ error: 'Invalid request type' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const combinedRouteHandler = async (req, res) => {
    try {
        const { value } = req.body;

        if (!value) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const ver = jwt.verify(value, process.env.KEY);
        console.log(ver.id, "jijijij");

        const warden = await Warden.findOne({ _id: ver.id });
        if (!warden) {
            return res.status(404).json({ error: 'No warden found' });
        }

        const base64Data = Buffer.from(warden.img.data.buffer).toString('base64');
        const wardendata = {
            name: warden.name,
            email: warden.email,
            hostel: warden.hostel,
            mobile: warden.mobile,
        };

        const image = {
            img: {
                data: `${base64Data}`,
                contentType: warden.img.contentType
            },
        };

        const hostels = warden.hostel.concat(warden.assign);
        const hostelData = [];

        for (const hostel of hostels) {
            const students = await Student.find({ hostel: hostel },"outpass_history");

            if (!students || students.length === 0) {
                hostelData.push({ hostel: hostel });
                continue;
            }
            
            const present = await Student.aggregate([
                { $match: { hostel: hostel } },
                { $unwind: "$outpass_history" },
                {
                    $group: {
                        _id: null,
                        out: {
                            $sum: {
                                $cond: [{ $eq: ["$outpass_history.status", "out"] }, 1, 0]
                            }
                        },
                        waiting: {
                            $sum: {
                                $cond: [{ $eq: ["$outpass_history.status", "waiting"] }, 1, 0]
                            }
                        },
                        accept: {
                            $sum: {
                                $cond: [{ $eq: ["$outpass_history.status", "accept"] }, 1, 0]
                            }
                        },
                        
                    }
                }
            ]);
            
            const totalStudents = students.length;
            const totalOut = present.length > 0 ? present[0].out : 0;
            const totalWaiting = present.length > 0 ? present[0].waiting : 0;
            const totalAccept = present.length > 0 ? present[0].accept : 0;
            const totalPresent = totalStudents - totalOut;
            const ins = totalOut.length <= 0 ? totalPresent : totalPresent-totalOut
            console.log(ins > 0);
            const totalIn = ins > 0 ? ins : 0;
            
            hostelData.push({
                hostel: hostel,
                totalStudents: [totalStudents, totalIn, totalOut, totalWaiting, totalAccept, totalPresent]
            });
            
        }

        const totalStudents = await Student.countDocuments({});
        const totalOut = await Student.countDocuments({ 'outpass_history.status': 'out' });
        const totalWaiting = await Student.countDocuments({ 'outpass_history.status': 'waiting' });
        const totalAccept = await Student.countDocuments({ 'outpass_history.status': 'accept' });
        const totalIn = await Student.countDocuments({ 'outpass_history.status': 'in' });

        res.status(201).json({
            message: 'Students retrieved successfully',
            warden: wardendata,
            image,
            students: [totalStudents, totalIn, totalOut, totalWaiting, totalAccept, totalStudents - totalOut],
            student: hostelData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// const combinedRouteHandler = async (req, res) => {
//     try {
//         const { value } = req.body;

//         if (value) {
//             // Warden fetch logic
//             const ver = jwt.verify(value, process.env.KEY);
//             console.log(ver.id, "jijijij");

//             const warden = await Warden.findOne({ _id: ver.id });
//             if (!warden) {
//                 return res.json({
//                     error: 'No warden found'
//                 });
//             }

//             const base64Data = Buffer.from(warden.img.data.buffer).toString('base64');
//             const wardendata = {
//                 name: warden.name,
//                 email: warden.email,
//                 hostel: warden.hostel,
//                 mobile: warden.mobile,
//             }

//             const image = {
//                 img: {
//                     data: `${base64Data}`,
//                     contentType: warden.img.contentType
//                 },
//             }

//             if(warden){
//                 console.log("work",warden.hostel,warden.assign);
//                 // Assuming warden.hostels is an array of hostels
// const hostels = warden.hostel.concat(warden.assign);
// console.log(hostels);
// const hostelData = [];

// for (let i = 0; i < hostels.length; i++) {
//     const hostel = hostels[i];
//     const students = await Student.find({ hostel: hostel });

//     if (!students || students.length === 0) {
//         hostelData.push({ hostel: hostel, error: 'No students found' });
//         continue;
//     }

//     const present = students.map((student) => {
//         const outStatusData = student.outpass_history.filter((item) => item.status === 'out');
//         const waitingStatusData = student.outpass_history.filter((item) => item.status === 'waiting');
//         const acceptStatusData = student.outpass_history.filter((item) => item.status === 'accept');
//         const inStatusData = student.outpass_history.filter((item) => item.status === 'in');
//         return {
//             out: outStatusData.length,
//             waiting: waitingStatusData.length,
//             accept: acceptStatusData.length,
//             in: inStatusData.length
//         };
//     });

//     let sumOut = 0;
//     let sumWaiting = 0;
//     let sumAccept = 0;
//     let sumIn = 0;
//     for (let j = 0; j < present.length; j++) {
//         sumOut += present[j].out;
//         sumWaiting += present[j].waiting;
//         sumAccept += present[j].accept;
//         sumIn += present[j].in;
//     }

//     const totalStudents = students.length;
//     const totalOut = sumOut;
//     const totalWaiting = sumWaiting;
//     const totalAccept = sumAccept;
//     const totalIn = sumIn;
//     const totalPresent = totalStudents - totalOut;

//     hostelData.push({
//         hostel: hostel,
//         totalStudents: [totalStudents,totalIn,totalOut,totalWaiting,totalAccept,totalPresent],
//         // totalOut: totalOut,
//         // totalWaiting: totalWaiting,
//         // totalAccept: totalAccept,
//         // totalIn: totalIn,
//         // totalPresent: totalPresent
//     });
// }
// // console.log(hostelData,"tertfdd");

// // res.json(hostelData);


//         //     const students = await Student.find({hostel:warden.hostel});
//         // if (!students || students.length === 0) {
//         //     return res.json({ error: 'No students found' });
//         // }
//         // // console.log(students);
        
//         // const present1 = students.map((student, index) => {
//         //     const outStatusData = student.outpass_history.filter((item) => item.status === 'out');
//         //     const waitingStatusData = student.outpass_history.filter((item) => item.status === 'waiting');
//         //     const acceptStatusData = student.outpass_history.filter((item) => item.status === 'accept');
//         //     const inStatusData = student.outpass_history.filter((item) => item.status === 'in');
//         //     const countOutStatus = outStatusData.length;
//         //     const countWaitingStatus = waitingStatusData.length;
//         //     const countAcceptStatus = acceptStatusData.length;
//         //     const countInStatus = inStatusData.length;
//         //     return {
//         //         out: countOutStatus,
//         //         waiting: countWaitingStatus,
//         //         accept: countAcceptStatus,
//         //         in: countInStatus
//         //     };
//         // });
//         // let sumOut1 = 0;
//         // let sumWaiting1 = 0;
//         // let sumAccept1 = 0;
//         // let sumIn1 = 0;
//         // for (let i = 0; i < present1.length; i++) {
//         //     sumOut1 += present1[i].out;
//         //     sumWaiting1 += present1[i].waiting;
//         //     sumAccept1 += present1[i].accept;
//         //     sumIn1 += present1[i].in;
//         // }
//         // const studentArray1 = students.map(student => Object.values(student));
//         // const length1 = studentArray1.length;
//         // const total1 = length1 - sumOut1;


//         const student = await Student.find({});
//         if (!student || student.length === 0) {
//             console.log("kkkkmkmk");
//             // continue;
//         }
//         const present = student.map((student, index) => {
//             const outStatusData = student.outpass_history.filter((item) => item.status === 'out');
//             const waitingStatusData = student.outpass_history.filter((item) => item.status === 'waiting');
//             const acceptStatusData = student.outpass_history.filter((item) => item.status === 'accept');
//             const inStatusData = student.outpass_history.filter((item) => item.status === 'in');
//             const countOutStatus = outStatusData.length;
//             const countWaitingStatus = waitingStatusData.length;
//             const countAcceptStatus = acceptStatusData.length;
//             const countInStatus = inStatusData.length;
//             return {
//                 out: countOutStatus,
//                 waiting: countWaitingStatus,
//                 accept: countAcceptStatus,
//                 in: countInStatus
//             };
//         });
//         let sumOut = 0;
//         let sumWaiting = 0;
//         let sumAccept = 0;
//         let sumIn = 0;
//         for (let i = 0; i < present.length; i++) {
//             sumOut += present[i].out;
//             sumWaiting += present[i].waiting;
//             sumAccept += present[i].accept;
//             sumIn += present[i].in;
//         }
//         const studentArray = student.map(student => Object.values(student));
//         const length = studentArray.length;
//         const total = length - sumOut;
//         console.log(length, total, sumOut, sumWaiting, sumAccept, sumIn);
//         res.status(201).json({
//             message: 'Students retrieved successfully',
//             warden: wardendata, 
//             image ,
//             students: [length, total, sumOut, sumWaiting, sumAccept, sumIn],
//             student:hostelData
//             // student: [length1, total1, sumOut1, sumWaiting1, sumAccept1, sumIn1]
//         }); 


//         // res.status(201).json({
//         //     message: 'Students retrieved successfully',
//         //     students: [length, total, sumOut, sumWaiting, sumAccept, sumIn]
//         // });
//             }

//             // return res.status(201).json({ message: 'Logged in successfully', warden: wardendata, image });
//         // } else if (action === 'fetchStudentsStatus') {
//         //     // Fetch students status logic
//         //     const students = await Student.find({});
//         //     // Rest of the logic
//         // } else if (action === 'fetchStudentStatushostel') {
//         //     // Fetch student status by hostel logic
//         //     const students = await Student.find({ hostel: hostel });
//         //     // Rest of the logic
//         // } 
//         else {
//             res.status(400).json({ error: 'Invalid action' });
//         }
//     } }catch (error) {
//         res.status(500).json({ error: ",kokokok" });
//     }
// };

const cancel = async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data.assign, data.email);

        // Execute both database updates concurrently
        await Promise.all([
            Warden.findOneAndUpdate(
                { email: data.email },
                { $pop: { assign: 1 }, $set: { present: "yes" } },
                { new: true }
            ),
            Warden.findOneAndUpdate(
                { hostel: data.assign },
                { $set: { present: "yes" } },
                { new: true }
            )
        ]);

        res.status(201).json({ message: 'Cancel successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const report = async (req, res) => {
    const { fromDate, toDate ,selectedOption,value} = req.body;
    
    console.log(fromDate, toDate ,selectedOption,value);
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
            { $match: { "hostel": value } }, 
            { $replaceRoot: { newRoot: "$outpass_history" } } 
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

// const cancel = async (req, res) => {
//     try {
//         const { data } = req.body;
//         console.log(data.assign,data.email);
//         // const warden = await Warden.find({ email: data.email });
//          await Warden.findOneAndUpdate(
//             { email: data.email }, // Find the document by email
//             { $pop: { assign: 1 },$set:{present:"yes"}}, // Pop the last element from the 'hostel' array
//             { new: true } // Return the updated document
//             );
//         // await Warden.find({ hostel: data.assign });
//          await Warden.findOneAndUpdate(
//             { hostel: data.assign }, // Find the document by email
//             { $set:{present:"yes"}}, // Pop the last element from the 'hostel' array
//             { new: true } // Return the updated document
//             );
//             res.status(201).json({ message: 'cancel successfully'});
//         // if (warden.length === 0) {
//         //     return res.json({
//         //         error: 'No warden found'
//         //     });
//         // }
//         // console.log(data,"asd");

//         // // Assuming you want to remove the last hostel, use pop()
//         // const removedHostel = warden[0].hostel.pop();

//         // // If you want to remove a specific hostel, you can use splice() like this:
//         // // warden[0].hostel.splice(indexOfHostelToRemove, 1);

//         // await warden[0].save(); // Assuming warden[0] is the document you want to update
//         // console.log(warden[0].hostel, "asdasda");
//         // // const base64Data = Buffer.from(warden.img.data.buffer).toString('base64');
//         // // console.log(warden);
//         // const hostelNames = warden.flatMap(warden => warden.hostel);
//         // const combinedData =await warden.map(warden => ({
//         //     wardenName: warden.name.trim(),
//         //     hostelName: warden.hostel,
//         //     email:warden.email,
            
//         //   }));
//         // //   const image={img: {
//         // //     data: `${base64Data}`,
//         // //     contentType: warden.img.contentType
//         // //   },}
//         // console.log(hostelNames);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const Editstudent = async (req, res) => {
    try {
        const form = req.body.newform;
        const email = req.body.email;
        console.log(form, email);

        
        // Find the student by email
        if(email===form.email){
            
        const warden = await Warden.findOne({ email: email },"email password");
        if (!warden) {
            return res.status(200).json({ message: 'No Warden found' });
        }
        console.log(warden);
        // Check if the old password matches
        const validPassword = await bcrypt.compare(form.oldpassword, warden.password);
        if (!validPassword) {
            // console.log("Password does not match");
            return res.status(200).json({ message: 'old Password does not match' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // console.log(salt);
        const hashPassword = await bcrypt.hash(form.password, salt);
        // console.log(hashPassword);
        // Update Warden information
        await Warden.findOneAndUpdate(
            { email: email },
            { $set: { password: hashPassword ,email: form.email} },
            { new: true }
        );

        console.log("Email and Password updated successfully");

        // Optionally, you can generate a new JWT token here if needed

        return res.status(200).json({ message: 'Password updated successfully' });
        }else{
            const arden = await Warden.findOne({ email: form.email },"email password");
            if (arden) {
                return res.status(200).json({ message: 'Email Is Alrady Taken' });
            }
            const warden = await Warden.findOne({ email: email },"email password");
        if (!warden) {
            return res.status(200).json({ message: 'No Warden found' });
        }
        console.log(warden);
        // Check if the old password matches
        const validPassword = await bcrypt.compare(form.oldpassword, warden.password);
        if (!validPassword) {
            // console.log("Password does not match");
            return res.status(200).json({ message: 'old Password does not match' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // console.log(salt);
        const hashPassword = await bcrypt.hash(form.password, salt);
        // console.log(hashPassword);
        // Update Warden information
        await Warden.findOneAndUpdate(
            { email: email },
            { $set: { password: hashPassword ,email: form.email} },
            { new: true }
        );

        console.log("Email and Password updated successfully");

        // Optionally, you can generate a new JWT token here if needed

        return res.status(200).json({ message: 'Password updated successfully' });
        }
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerWarden, loginWarden, wardenfetch,wardenhostel,wardenassign,wardenfetchAndFetchStudent,combinedRouteHandler,cancel,fetch,Editstudent, report };
