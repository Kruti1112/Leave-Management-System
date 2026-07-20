require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");
const Leave = require("./models/Leave");
const upload = require("./middleware/upload");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register API
app.post("/register", upload.single("photo"), (req, res) => {
    const { name, email, phone, address, department, designation, password } = req.body;
    const photo = req.file ? `/uploads/profile/${req.file.filename}` : "";

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
                        department,
                        designation,
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
    const isPhone = emailOrPhone.startsWith("+") && !isNaN(emailOrPhone.substring(1));

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
                    Leave.countDocuments({ status: "Rejected" })
                    .then((rejectedLeaves) => {
                        res.json({
                            totalEmployees: totalEmployees,
                            totalLeaves: totalLeaves,
                            pendingLeaves: pendingLeaves,
                            approvedLeaves: approvedLeaves,
                            rejectedLeaves: rejectedLeaves
                        });
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

// AI Feature: Leave Clash Prediction
app.get("/admin/ai/clash-prediction", (req, res) => {
    Leave.find({ status: { $in: ["Approved", "Pending"] } })
        .then((leaves) => {
            const dateMap = new Map();
            
            leaves.forEach((leave) => {
                const fromDate = new Date(leave.fromDate);
                const toDate = new Date(leave.toDate);
                
                let currentDate = new Date(fromDate);
                while (currentDate <= toDate) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    
                    if (!dateMap.has(dateStr)) {
                        dateMap.set(dateStr, []);
                    }
                    dateMap.get(dateStr).push({
                        employeeName: leave.employeeName,
                        email: leave.email,
                        leaveType: leave.leaveType
                    });
                    
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });
            
            const clashes = [];
            dateMap.forEach((employees, date) => {
                if (employees.length > 1) {
                    clashes.push({
                        date: date,
                        employees: employees,
                        count: employees.length
                    });
                }
            });
            
            res.json({
                clashes: clashes,
                totalClashes: clashes.length
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});

// AI Feature: Smart Leave Suggestions
app.get("/admin/ai/suggestions", (req, res) => {
    Leave.find()
        .then((leaves) => {
            const dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            
            leaves.forEach((leave) => {
                const fromDate = new Date(leave.fromDate);
                const dayOfWeek = fromDate.getDay();
                dayCount[dayOfWeek]++;
            });
            
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const suggestions = [];
            
            Object.keys(dayCount).forEach((day) => {
                suggestions.push({
                    day: dayNames[day],
                    count: dayCount[day],
                    recommendation: dayCount[day] > 5 ? "High leave day" : "Low leave day"
                });
            });
            
            res.json({
                suggestions: suggestions.sort((a, b) => b.count - a.count)
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});

// AI Feature: Department-wise Statistics
app.get("/admin/ai/department-stats", (req, res) => {
    Leave.find()
        .then((leaves) => {
            const departmentMap = new Map();
            
            leaves.forEach((leave) => {
                const dept = leave.department || "Others";
                if (!departmentMap.has(dept)) {
                    departmentMap.set(dept, 0);
                }
                departmentMap.set(dept, departmentMap.get(dept) + 1);
            });
            
            const departmentStats = [];
            departmentMap.forEach((count, department) => {
                departmentStats.push({
                    department: department,
                    leaves: count
                });
            });
            
            res.json({
                departments: departmentStats.sort((a, b) => b.leaves - a.leaves)
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});

// AI Feature: AI Insights
app.get("/admin/ai/insights", (req, res) => {
    Leave.find()
        .then((leaves) => {
            const insights = [];
            
            // Insight 1: Peak leave month
            const monthCount = new Array(12).fill(0);
            leaves.forEach((leave) => {
                const month = new Date(leave.fromDate).getMonth();
                monthCount[month]++;
            });
            
            const peakMonth = monthCount.indexOf(Math.max(...monthCount));
            const monthNames = ["January", "February", "March", "April", "May", "June", 
                               "July", "August", "September", "October", "November", "December"];
            
            insights.push({
                type: "warning",
                icon: "AlertTriangle",
                text: "High leave requests expected in " + monthNames[peakMonth]
            });
            
            // Insight 2: Most common leave day
            const dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            leaves.forEach((leave) => {
                const day = new Date(leave.fromDate).getDay();
                dayCount[day]++;
            });
            
            const mostCommonDay = Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b);
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            
            insights.push({
                type: "info",
                icon: "Calendar",
                text: "Most leaves on " + dayNames[mostCommonDay]
            });
            
            // Insight 3: Pending approval rate
            const pendingCount = leaves.filter(l => l.status === "Pending").length;
            const totalCount = leaves.length;
            const pendingRate = ((pendingCount / totalCount) * 100).toFixed(1);
            
            if (pendingRate > 20) {
                insights.push({
                    type: "alert",
                    icon: "TrendingUp",
                    text: pendingRate + "% of leaves pending review"
                });
            }
            
            res.json({
                insights: insights
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});

// AI Feature: Workload-aware Approval Suggestion
app.post("/admin/ai/workload-suggestion", (req, res) => {
    const { leaveId } = req.body;
    
    Leave.findById(leaveId)
        .then((leave) => {
            Leave.find({
                status: { $in: ["Approved", "Pending"] },
                _id: { $ne: leaveId }
            })
            .then((otherLeaves) => {
                const fromDate = new Date(leave.fromDate);
                const toDate = new Date(leave.toDate);
                
                let concurrentLeaves = 0;
                otherLeaves.forEach((otherLeave) => {
                    const otherFromDate = new Date(otherLeave.fromDate);
                    const otherToDate = new Date(otherLeave.toDate);
                    
                    if (fromDate <= otherToDate && toDate >= otherFromDate) {
                        concurrentLeaves++;
                    }
                });
                
                let suggestion = "Approve";
                let reason = "Low team impact";
                
                if (concurrentLeaves > 3) {
                    suggestion = "Review";
                    reason = "High team overlap - " + concurrentLeaves + " concurrent leaves";
                } else if (concurrentLeaves > 1) {
                    suggestion = "Consider";
                    reason = "Moderate team overlap - " + concurrentLeaves + " concurrent leaves";
                }
                
                res.json({
                    suggestion: suggestion,
                    reason: reason,
                    concurrentLeaves: concurrentLeaves
                });
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        });
});
