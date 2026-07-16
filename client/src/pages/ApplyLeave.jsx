import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ApplyLeave.css";

function ApplyLeave() {

    const [employee, setEmployee] = useState({});
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        const email = sessionStorage.getItem("email");
        axios.get("http://localhost:5000/employee/" + email)
        .then((response) => {
            console.log(response.data);
            setEmployee(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function applyLeave() {
        if (leaveType === "") {
            alert("Please Select Leave Type");
            return;
        }
        if (fromDate === "") {
            alert("Please Select From Date");
            return;
        }
        if (toDate === "") {
            alert("Please Select To Date");
            return;
        }
        if (reason === "") {
            alert("Please Enter Reason");
            return;
        }
        axios.post("http://localhost:5000/applyleave", {

            employeeId: employee._id,
            employeeName: employee.name,
            email: employee.email,
            leaveType: leaveType,
            fromDate: fromDate,
            toDate: toDate,
            reason: reason

        })
        .then((response) => {
            alert(response.data);
            setLeaveType("");
            setFromDate("");
            setToDate("");
            setReason("");
        })

        .catch((error) => {
            console.log(error);
            alert("Error Applying Leave");
        });
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul>
                    <li onClick={() => window.location="/dashboard"}>
                        Dashboard
                    </li>
                    <li>
                        Apply Leave
                    </li>
                    <li onClick={() => window.location="/leavehistory"}>
                        Leave History
                    </li>
                    <li onClick={() => window.location="/login"}>
                        Logout
                    </li>
                </ul>
            </div>
            <div className="main">
                <div className="leave-box">
                    <h1>Apply Leave</h1>
                    <label>Employee Name</label>
                    <input
                        type="text"
                        value={employee.name || ""}
                        readOnly
                    />
                    <label>Employee ID</label>
                    <input
                        type="text"
                        value={employee._id || ""}
                        readOnly
                    />
                    <label>Leave Type</label>
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                        <option value="">Select Leave</option>
                        <option>Sick Leave</option>
                        <option>Casual Leave</option>
                        <option>Privilege Leave</option>
                    </select>
                    <label>From Date</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <label>To Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                    <label>Reason</label>
                    <textarea
                        rows="3"
                        value={reason}
                        placeholder="Enter Your Reason"
                        onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                    <button onClick={applyLeave}>
                        Apply Leave
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyLeave;