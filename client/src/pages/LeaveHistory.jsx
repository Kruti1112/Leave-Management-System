import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LeaveHistory.css";

function LeaveHistory() {
    const [leaves, setLeaves] = useState([]);
    const email = sessionStorage.getItem("email");

    useEffect(() => {
        axios.get("http://localhost:5000/leavehistory/" + email)
            .then((response) => setLeaves(response.data))
            .catch((error) => console.log(error));
    }, [email]);

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul>
                    <li onClick={() => (window.location = "/dashboard")}>Dashboard</li>
                    <li onClick={() => (window.location = "/applyleave")}>Apply Leave</li>
                    <li>Leave History</li>
                    <li onClick={() => (window.location = "/login")}>Logout</li>
                </ul>
            </div>

            <div className="main">
                <h2 className="page-title">Leave History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{leave.leaveType}</td>
                                <td>{leave.fromDate}</td>
                                <td>{leave.toDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveHistory;