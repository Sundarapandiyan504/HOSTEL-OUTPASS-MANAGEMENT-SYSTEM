require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
// const userRoutes = require("./routes/users");
const adminRoutes= require("./routes/admin")
// const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const watchmanRouts =require("./routes/watchman")
const wardenRoutes = require('./routes/warden')
const cookieParser = require('cookie-parser');
const os = require('os');
// database connection
connection();
 
// middlewares
app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

// routes

// app.use("/users", userRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/warden", wardenRoutes);
app.use("/watchman", watchmanRouts);

// app.get('/ip',(req,res)=>{
//     const networkInterfaces = os.networkInterfaces();
// const ipAddress = networkInterfaces['Wi-Fi']; // Change 'Ethernet' to your network interface name
//  ipAddress.map((i,index)=>{
//     // console.log(i.family);
//     if(i.family==="IPv4"){
//         res.status(201).json({ message: "ip get successfully",ip:i.address });
//         console.log("IPV4 :",i.address);
//         // let ip =i.address
//         // res.render('index', { ip });
//     }
//  }) 
// })

const port=8080;
app.listen(port, console.log(`Listening on port ${port}...`));
