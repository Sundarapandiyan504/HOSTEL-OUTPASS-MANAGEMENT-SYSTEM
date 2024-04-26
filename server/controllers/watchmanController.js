const { Watchman } = require("../models/watchman");
const { Student } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const currentDate = new Date();
const currentDateString = currentDate.toISOString().split('T')[0];

async function createWatchman(req, res) {
    try {
        const form = req.body.form;
        console.log("Watchman", form.email);
        const user = await Watchman.findOne({ email: form.email });
        if (user) {
            return res.json({ message: "User with given email already Exist!" });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(form.password, salt);
        await new Watchman({
            name: form.name,
            email: form.email,
            password: hashPassword,
            mobile_number: form.mobile,
        }).save();
        res.status(201).json({ message: "Watchman created successfully" });
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
}

async function loginWatchman(req, res) {
    const form = req.body.form;
    const watchman = await Watchman.findOne({ email: form.email });
    if (!watchman) {
        return res.json({
            error: 'No Watchman found'
        });
    }
    const validPassword = await bcrypt.compare(form.password, watchman.password);
    if (!validPassword) {
        return res.json({
            error: 'password do not match'
        })
    }
    const token = jwt.sign({ WatchmanId: watchman._id }, process.env.KEY);
    res.status(201).json({ message: 'Logged in successfully', token: token, roll: "watchman" });
}

// async function fetchWatchman(req, res) {
//     const { value } = req.body;
//     const ver = jwt.verify(value, process.env.KEY)
//     const watchman = await Watchman.findOne({ _id: ver.WatchmanId });
//     if (!watchman) {
//         return res.json({
//             error: 'No Watchman found'
//         })
//     }
//     res.status(201).json({ message: 'Logged in successfully', watchman: watchman });
// }
const fetchWatchman = async (req, res) => {
    try {
        const { value } = req.body;
        const ver = jwt.verify(value, process.env.KEY);
        const watchman = await Watchman.findOne({ _id: ver.WatchmanId });
        
        if (!watchman) {
            return res.json({ error: 'No Watchman found' });
        }

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

        const length = students.length;
        const sumOut = counts.out;
        const sumWaiting = counts.waiting;
        const sumAccept = counts.accept;
        const sumIn = counts.in;

        const total = length - sumOut;

        res.status(201).json({
            message: 'Students retrieved successfully',
            watchman: watchman,
            students: [length, total, sumOut, sumWaiting, sumAccept, sumIn]
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function updateStudentStatus(req, res) {
    const { status } = req.body;
    const { data } = req.body;
    const currentDate = new Date(); // Get current date and time

    // Determine the field to update based on the status
    let updateField;
    if (status === 'out') {
        updateField = 'studentout';
    } else if (status === 'in') {
        updateField = 'studentin';
    } else {
        return res.json({ message: 'Invalid status' });
    }
    console.log(currentDate,updateField);
    // Update the document in the database
    Student.findOneAndUpdate(
        { admission_id: data.admission_id, 'outpass_history.status': data.status },
        { 
            $set: {
                'outpass_history.$.status': status,
                [`outpass_history.$.${updateField}`]: currentDate
            }
        },
        { new: true },
        (err, updatedStudent) => {
            if (err) {
                res.json({ message: err });
            } else if (!updatedStudent) {
                res.json({ message: 'Student not found or no matching outpass with the specified status.' });
            } else {
                console.log("hi",status);
                res.status(201).json({ message: 'Change student status success' });
            }
        }
    );
    
    
}


async function fetchAllWatchmen(req, res) {
    const Watchman = await Outpass.find({});
    if (!Watchman) {
        return res.json({
            error: 'No Watchman found'
        })
    }
    res.status(201).json({ message: 'std get successfully', Watchman: Watchman });
}

async function verifyToken(req, res) {
    const { token } = req.body;
    try {
        const ver = jwt.verify(token, process.env.KEY);
        // console.log(ver.data, "vgggvgvg");
        try {
            Student.find(
                {
                    admission_id: ver.data,
                    $or: [
                        { 'outpass_history.status': 'accept' },
                        { 'outpass_history.status': 'out' }
                    ]
                },
                (err, items) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: 'An error occurred' });
                    } else if (items.length === 0) {
                        res.status(200).json({ message: 'Cannot get the student OR Not validie QR-CODE' });
                    } else {
                        items[0].outpass_history.forEach((item) => {
                            if (item.status === 'accept') {
                                const studentsWithImages = items.map((i,index)=>{

                                    const base64Data = Buffer.from(i.img.data.buffer).toString('base64');
                                    const image = {
                                        data: base64Data,
                                        contentType: i.img.contentType
                                    };
                                    return image 
                                    // console.log(image);
                                    // console.log(items);
                                })
                                // (student => {
                                // });
                                // console.log(studentsWithImages);
                                res.status(201).json({ message: "Student status Accept", ver: item,image:studentsWithImages });
                            } else if (item.status === 'out') {
                                const studentsWithImages = items.map((i,index)=>{

                                    const base64Data = Buffer.from(i.img.data.buffer).toString('base64');
                                    const image = {
                                        data: base64Data,
                                        contentType: i.img.contentType
                                    };
                                    return image 
                                    // console.log(items);
                                })
                                console.log(studentsWithImages);
                                res.status(201).json({ message: "Student status Out", ver: item,image:studentsWithImages });
                            }
                        });
                    }
                });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log("error");
        res.status(200).json({ message: 'Not validie QR-CODE' });
    }
}

async function checkStudent(req, res) {
    const { id } = req.body;
    const Watchman = await Watchman.findOne({ admission_id: id });
    if (Watchman.outpass_history) {
        const con = JSON.stringify(Watchman.outpass_history)
        const test = con === "[]";
        if (!test) {
            const result = Watchman.outpass_history.map((i, index) => {
                if (i.status === "accept") {
                    const token = jwt.sign({ data: i }, process.env.KEY)
                    res.status(202).json({ status: i.status, outpass: token })
                }
            })
        } else {
            res.json({ error: 'No Watchman found' })
        }
    }
}

async function createOutpass(req, res) {
    console.log("outpass");
    const { id, name, course, mobile, room, hostel, out, In, reason } = req.body;
    try {
        await new Outpass({
            name: name,
            course: course,
            hostel: hostel,
            admission_id: id,
            room_number: room,
            mobile_number: mobile,
            status: "waiting",
            out: out,
            in: In,
            reason: reason.reason
        }).save();
        res.status(201).json({ message: "outpass created successfully" });
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
}

async function updateOutpass(req, res) {
    console.log("outpassupd");
    const { status } = req.body;
    const { data } = req.body
    try {
        const Watchman = await Watchman.findOneAndUpdate(
            { admission_id: data.admission_id },
            {
                $push: {
                    outpass_history: {
                        name: data.name,
                        course: data.course,
                        hostel: data.hostel,
                        admission_id: data.admission_id,
                        room_number: data.room_number,
                        mobile_number: data.mobile_number,
                        status: status,
                        out: data.out,
                        in: data.in,
                        reason: data.reason
                    } 
                }
            },
            { new: true }
        ).then(async () => {
            await Outpass.deleteOne({ admission_id: data.admission_id })
        })
        console.log("data send");
        res.status(201).json({ message: "outpass created successfully" });
    } catch (error) {
        res.json({ message: "Internal Error" });
    }
}

module.exports = {
    createWatchman,
    loginWatchman,
    fetchWatchman,
    updateStudentStatus,
    fetchAllWatchmen,
    verifyToken,
    checkStudent,
    createOutpass,
    updateOutpass
};
