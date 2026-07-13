import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Applyleave.css";

function ApplyLeave() {

    const [employee, setEmployee] = useState({});
    const [leaveType,setLeaveType] = useState({});
    const [fromDate,setFromDate] = useState({});
    const [toDate,setToDate] = useState({});
    const [reason,setReason] = useState({});
    const email = sessionStorage.getItem("email");

    useEffect(() => {
    axios.get("http://localhost:5000/employee/" + email)
    .then((response) => {
        setEmployee(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}, []);
    function applyLeave() {   
        if (leaveType === "") {
            alert("Please select leave type");
            return;
        }

        if (fromDate === ""){
            alert("Please enter From Date");
            return;
        }

        if (toDate === ""){
            alert("Please enter To Date");
            return;
        }

        if (reason === ""){
            alert("Please enter Reason");
            return;
        }

        let today = new Date();
        let leaveDate = new Date(fromDate);

        let casualDate = new Date();
        casualDate.setDate(today.getDate() + 2);

        let privilegeDate = new Date();
        privilegeDate.setDate(today.getDate() + 7);

        if (leaveType === "Casual Leave" && leaveDate < casualDate) {
            alert("Casual Leave must be applied at least 2 days before.");
            return;
        }

        if (leaveType === "Privileged Leave" && leaveDate < privilegeDate){
            alert("Privilege Leave must be applied al least 7 days before.");
            return;
        }
        console.log(employee);
        console.log(employee.email);

        axios.post("http://localhost:5000/applyleave",  {
            employeeId: employee._id,
            employeeName: employee.name,
            email: employee.email,
            leaveType: leaveType,
            fromDate: fromDate,
            toDate: toDate,
            reason: reason,                        
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => {
            console.log(error);
            alert("Error");
        });
    }

        return (

        <div className="dashboard">

            {/* Sidebar */}

            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul>
                    <li onClick={() => window.location = "/dashboard"}>Dashboard</li>
                    <li>Apply Leave</li>
                    <li onClick={() => window.location = "/leavehistory"}>Leave History</li>
                    <li onClick={() => window.location = "/login"}>Logout</li>
                </ul>
            </div>

            {/* Main */}

            <div className="main">
                <div className="leave-box">
                    <h1>Apply Leave</h1>
                    <label>Employee Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={employee.name}
                    />

                    <label>Employee ID</label>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={employee._id}
                    />

                    <label>Leave Type</label>
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                        <option value="">Select Leave</option>
                        <option>Sick Leave</option>
                        <option>Casual Leave</option>
                        <option>Privileged Leave</option>
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
                        rows="2"
                        placeholder="Reason"
                        value={reason}
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

