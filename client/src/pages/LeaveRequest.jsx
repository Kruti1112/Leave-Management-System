import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LeaveRequest.css";

function LeaveRequest() {

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        getLeaves();
    }, []);

    function getLeaves() {

        axios.get("http://localhost:5000/admin/leaves")
        .then((response) => {
            setLeaves(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }

    function updateStatus(id, status) {
        axios.put("http://localhost:5000/admin/leaves/" + id, {
            status: status
        })
        .then((response) => {
            alert(response.data.message);
            getLeaves();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul>
                    <li onClick={() => window.location="/admindashboard"}>
                        Dashboard
                    </li>

                    <li>
                        Leave Requests
                    </li>

                    <li onClick={() => window.location="/adminlogin"}>
                        Logout
                    </li>
                </ul>
            </div>

            <div className="main">
                <h1>Leave Requests</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{leave.employeeName}</td>
                                <td>{leave.email}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.fromDate}</td>
                                <td>{leave.toDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                                <td>
                                    {
                                    leave.status === "Pending" ? (
                                    <>
                                    <button
                                    className="approve"
                                    onClick={() => updateStatus(leave._id, "Approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                    className="reject"
                                    onClick={() => updateStatus(leave._id, "Rejected")}
                                    >
                                        Reject
                                    </button>
                                    </>
                                ) : null
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveRequest;