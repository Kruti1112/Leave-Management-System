require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//register api
app.post("/register", async(req, res) =>{

    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        photo: req.body.photo,
        password: req.body.password,
        role: "Employee"
    });
    await employee.save();
    res.json({
        message: "Registration Successful.."
    })
});

//login api
app.post("/login", async (req, res) => {
    try {
        console.log(req.body);

        const employee = await Employee.findOne({
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });

        console.log(employee);

        if (employee) {
            return res.json({
                success: true,
                message: "Login Successful"
            });
        }

        return res.json({
            success: false,
            message: "Invalid Email, Phone number or Password"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

//Admin api
app.post("/adminLogin", async(req, res) =>{
    try {
        const adminEmail = "kruti11@gmail.com";
        const adminPassword = "K@uti1112";
        const enteredEmail = req.body.email || "";

        if (enteredEmail.toLowerCase() === adminEmail.toLowerCase() && req.body.password === adminPassword) {
            return res.json({
                success: true,
                message: "Admin Login Successful"
            });
        }

        return res.json({
            success: false,
            message: "Invalid Email, Phone number or Password"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

//Applied Leaves
app.get("/appliedleave/:email",async(req,res)=>{
    const total=await Leave.countDocuments({
        email:req.params.email
    });
    res.send(total.toString());
});

//Pending Leaves
app.get("/pendingleave/:email",async(req,res)=>{
    const total=await Leave.countDocuments({
        email:req.params.email,
        status:"Pending"
    });
    res.send(total.toString());
});

//Leave List
app.get("/leavehistory/:email",async(req,res)=>{
    const leaves=await Leave.find({
        email:req.params.email
    });
    res.send(leaves);
});

app.listen(5000, () => {
    console.log(`Server Running on Port 5000`);
});