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

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// photo
app.use("/uploads", express.static(uploadsDir));
//register api
app.post("/register", async(req, res) =>{
    try {
        let photoName = req.body.photoName || "default.png";
        
        // image
        if (req.body.photo && req.body.photo.includes(";base64,")) {
            const fs = require("fs");
            const matches = req.body.photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                const buffer = Buffer.from(matches[2], 'base64');
                const uniqueName = Date.now() + "_" + photoName;
                const uploadPath = path.join(__dirname, "uploads", uniqueName);
                fs.writeFileSync(uploadPath, buffer);
                photoName = uniqueName;
            }
        }

        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            photo: photoName, // Save only the file name in DB
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
// Admin status api
app.get("/admin/stats", async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments({});
        const totalLeaves = await Leave.countDocuments({});
        const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
        const approvedLeaves = await Leave.countDocuments({ status: "Approved" });

        res.json({
            totalEmployees,
            totalLeaves,
            pendingLeaves,
            approvedLeaves
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});
// Admin leaves api
app.get("/admin/leaves", async (req, res) => {
    try {
        const leaves = await Leave.find({});
        res.json(leaves);
    } catch (error) {
        console.error("Error fetching admin leaves:", error);
        res.status(500).json({ error: "Failed to fetch leaves" });
    }
});
// Admin update leave status api
app.put("/admin/leaves/:id", async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        const updatedLeave = await Leave.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedLeave) {
            return res.status(404).json({ error: "Leave request not found" });
        }
        res.json({
            success: true,
            message: `Leave status updated to ${status}`,
            leave: updatedLeave
        });
    } catch (error) {
        console.error("Error updating leave status:", error);
        res.status(500).json({ error: "Failed to update leave status" });
    }
});
//Get employee details by email
app.get("/employee/:email", async (req, res) => {
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
app.get("/pendingleave/:email",async(req,res)=>{
    const total=await Leave.countDocuments({
        email:req.params.email,
        status:"Pending"
    });
    res.send(total.toString());
});

//Leave history
app.get("/leavehistory/:email", async (req, res) => {
    const leaves = await Leave.find({
        email: req.params.email
    });
    res.send(leaves);
});
//Aplly leave api
app.post("/applyleave", async (req, res) => {
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