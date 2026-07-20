import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/LeaveRequest.css";

function LeaveRequest() {

    const [leaves, setLeaves] = useState([]);

    const navigate = useNavigate();

    const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");

    // navigate to admin login
    if (isAdminLoggedIn !== "true") {
        return <Navigate to="/adminlogin" replace />;
    }

    useEffect(() => {
        getLeaves();
    }, []);

    //get leaves

    function getLeaves() {

        axios.get("http://localhost:5000/admin/leaves")
            .then((response) => {
                setLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    //update status rejected or approved 

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

    function logout() {
        sessionStorage.removeItem("isAdminLoggedIn");
        navigate("/adminlogin");
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="brand-mark">LM</div>
                    <h2>Leave<br />Management</h2>
                </div>
                <ul>
                    <li onClick={() => navigate("/admindashboard")}>
                        <span className="nav-icon">◉</span>Dashboard
                    </li>

                    <li className="active">
                        <span className="nav-icon">✦</span>Leave Requests
                    </li>

                    <li onClick={() => navigate("/monthlyreport")}>
                        <span className="nav-icon">▤</span>Monthly Report
                    </li>

                    <li onClick={logout}>
                        <span className="nav-icon">⇢</span>Logout
                    </li>
                </ul>
            </div>
            <div className="main">
                <div className="page-title-row">
                    <div className="page-icon">✦</div>
                    <h1>Leave Requests</h1>
                </div>
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
                                    {leave.status === "Pending" ? (
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
                                    ) : null}

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