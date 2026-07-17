require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");
const Leave = require("./models/Leave");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Register API
app.post("/register", (req, res) => {
    const { name, email, phone, address, photo = "", password } = req.body;

    Employee.findOne({ email: email })
        .then((existingEmail) => {
            Employee.findOne({ phone: phone })
                .then((existingPhone) => {

                    // Both exist
                    if (existingEmail && existingPhone) {
                        return res.json({
                            success: false,
                            message: "Email and Phone Number already exist"
                        });
                    }

                    // Email exists
                    if (existingEmail) {
                        return res.json({
                            success: false,
                            message: "Email already exists"
                        });
                    }

                    // Phone exists
                    if (existingPhone) {
                        return res.json({
                            success: false,
                            message: "Phone Number already exists"
                        });
                    }

                    // Create employee
                    const employee = new Employee({
                        name,
                        email,
                        phone,
                        address,
                        photo,
                        password,
                        role: "Employee"
                    });

                    employee.save()
                        .then(() => {
                            res.json({
                                success: true,
                                message: "Registration Successful"
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({
                                success: false,
                                message: "Registration Failed",
                                error: error.message
                            });
                        });

                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({
                        success: false,
                        message: "Registration Failed",
                        error: error.message
                    });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Registration Failed",
                error: error.message
            });
        });
});

//login api
app.post("/login", (req, res) => {
    const emailOrPhone = req.body.emailOrPhone;
    const password = req.body.password;

    // check if input is email or phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

    let query;
    if (isEmail) {
        query = { email: emailOrPhone, password: password };
    } else if (isPhone) {
        query = { phone: emailOrPhone, password: password };
    } else {
        return res.json({
            success: false,
            message: "Invalid Email/Phone Number or Password"
        });
    }

    Employee.findOne(query)
        .then((employee) => {
            if (employee) {
                res.json({
                    success: true,
                    message: "Login Successful",
                    employee
                });
            } else {
                res.json({
                    success: false,
                    message: "Invalid Email/Phone Number or Password"
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                success: false,
                error: err.message
            });
        });
});

//employee details 
app.get("/employee/:email", (req, res) => {
    Employee.findOne({ email: req.params.email })
        .then((employee) => {
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({
                    message: "Employee not found"
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err.message
            });
        });
});

//pendind leave
app.get("/pendingleave/:email", (req, res) => {
    Leave.countDocuments({
        email: req.params.email,
        status: "Pending"
    })
        .then((total) => {
            res.send(total.toString());
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
});

//leave history
app.get("/leavehistory/:email", (req, res) => {
    Leave.find({
        email: req.params.email
    })
        .then((leaves) => {
            res.json(leaves);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
});

//apply leave
app.post("/applyleave", (req, res) => {
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

    leave
        .save()
        .then(() => {
            res.send("Leave Applied Successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
});

//admin login api
app.post("/adminLogin", (req, res) => {
    const adminEmail = "kruti@gmail.com";
    const adminPassword = "123456789";

    if (
        req.body.email === adminEmail &&
        req.body.password === adminPassword
    ) {
        res.json({
            success: true,
            message: "Admin Login Successful"
        });
    } else {
        res.json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
});

//show leave requests
app.get("/admin/leaves", (req, res) => {
    Leave.find()
    .then((leaves) => {
        res.json(leaves);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Error");
    });
});

//leave status
app.put("/admin/leaves/:id", (req, res) => {
    Leave.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        }
    )
    .then(() => {
        res.json({
            success: true,
            message: "Status Updated Successfully"
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Error");
    });
});

//leave count in admin dashboard
app.get("/admin/stats", (req, res) => {
    Employee.countDocuments()
    .then((totalEmployees) => {
        Leave.countDocuments()
        .then((totalLeaves) => {
            Leave.countDocuments({ status: "Pending" })
            .then((pendingLeaves) => {
                Leave.countDocuments({ status: "Approved" })
                .then((approvedLeaves) => {
                    res.json({
                        totalEmployees: totalEmployees,
                        totalLeaves: totalLeaves,
                        pendingLeaves: pendingLeaves,
                        approvedLeaves: approvedLeaves
                    });
                });
            });
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Error");
    });
});

//Monthly Report
app.get("/admin/monthlyreport/filter", (req, res) => {

    const selectedMonth = req.query.month; 
    const selectedYear = req.query.year;  

    Leave.find()
        .then((allLeaves) => {
            
            const filteredLeaves = allLeaves.filter(function(leave) {
                const leaveDate = new Date(leave.fromDate);

                // Check if date is valid
                if (isNaN(leaveDate.getTime())) {
                    return false;
                }

                const leaveMonth = leaveDate.getMonth() + 1; 
                const leaveYear = leaveDate.getFullYear();
                return leaveMonth === parseInt(selectedMonth) && leaveYear === parseInt(selectedYear);
            });

            res.json(filteredLeaves);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});

app.listen(5000, () => {
    console.log('Server Running on Port 5000'); 
});
