require ("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");
const Leave = require("./models/Leave");
const app = express();
const path = require("path");

connectDB();


// Middleware
app.use(cors());
app.use(express.json());

//register api
app.post("/register",(req, res) =>{
    try {
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            photo: photoName,
            password: req.body.password,
            role: "Employee"
        });
        await employee.save();
        res.json({
            message: "Registration Successful.."
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration Failed",
            error: error.message
        });
    }
});
//login api
app.post("/login", (req, res) => {
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
app.post("/adminLogin", (req, res) => {
    console.log("Admin Login Attempt:", req.body);
    const adminEmail = "kruti@gmail.com";
    const adminPassword = "123456789" ;

    if (
        req.body.email === adminEmail &&
        req.body.password === adminPassword
    ) {
        console.log("Admin Login Successful for:", adminEmail);
        res.json({
            success: true,
            message: "Admin Login Successful"
        });

    } else {
        console.log("Admin Login Failed for:", req.body.email);
        res.json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
});

//Get employee details by email
app.get("/employee/:email", (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.params.email });
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//Pending Leaves
app.get("/pendingleave/:email",(req,res)=>{
    const total=await Leave.countDocuments({
        email:req.params.email,
        status:"Pending"
    });
    res.send(total.toString());
});

//Leave history
app.get("/leavehistory/:email", (req, res) => {
    const leaves = await Leave.find({
        email: req.params.email
    });
    res.send(leaves);
});
//Aplly leave api
app.post("/applyleave", (req, res) => {
    try {
        const leave = new Leave({
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            email: req.body.email,
            leaveType: req.body.leaveType,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            reason: req.body.reason,
            status: "Pending"

        });
        await leave.save();
        res.send("Leave Applied Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Applying Leave");
    }
});

app.listen(5000, () => {
    console.log(`Server Running on Port 5000`);
});