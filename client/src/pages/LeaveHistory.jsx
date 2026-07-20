import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LeaveHistory.css";

function LeaveHistory() {

    const [leaves, setLeaves] = useState([]);

    const navigate = useNavigate();

    const email = sessionStorage.getItem("email");

    // navigate to login
    if (!email) {
        return <Navigate to="/login" replace />;
    }

    //get leave history

    function getLeaveHistory() {

        axios.get("http://localhost:5000/leavehistory/" + email)
            .then((response) => {
                setLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {

        getLeaveHistory();

    }, []);

    function logout() {
        sessionStorage.removeItem("email");
        navigate("/login");
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="brand-mark">LM</div>
                    <h2>Leave<br />Management</h2>
                </div>
                <ul>
                    <li onClick={() => navigate("/dashboard")}>
                        <span className="nav-icon">◉</span>Dashboard
                    </li>

                    <li onClick={() => navigate("/applyleave")}>
                        <span className="nav-icon">✦</span>Apply Leave
                    </li>

                    <li className="active">
                        <span className="nav-icon">▤</span>Leave History
                    </li>

                    <li onClick={logout}>
                        <span className="nav-icon">⇢</span>Logout
                    </li>
                </ul>
            </div>
            <div className="main">
                <div className="page-title-row">
                    <div className="page-icon">▤</div>
                    <h2 className="title">Leave History</h2>
                </div>
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