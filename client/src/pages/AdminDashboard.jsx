import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalLeaves: 0,
        pendingLeaves: 0,
        approvedLeaves: 0
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
            navigate("/adminlogin");
        } else {
            fetchData();
        }
    }, []);
    function fetchData() {
        axios.get("http://localhost:5000/admin/stats")
        .then((response) => {
            setStats(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function logout() {
        sessionStorage.clear();
        navigate("/adminlogin");
    }

    return (

        <div className="dashboard-container">

            {/* Sidebar */}
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul className="sidebar-menu">
                    <li>
                        Dashboard
                    </li>

                    <li onClick={() => window.location="/leaverequests"}>
                        Leave Requests
                    </li>

                    <li onClick={() => window.location="/monthlyreport"}>
                        Monthly Report
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>
                </ul>
            </div>

            {/* Main */}
            <div className="main-content">
                <div className="welcome-card">
                    <div className="profileimage">
                        K
                    </div>

                    <div>
                        <h2>Welcome Back</h2>
                        <p><b>Kruti Patel</b></p>
                        <p>kruti@gmail.com</p>
                        <p>Manage employee leave requests here.</p>
                    </div>
                </div>
                {/* Cards */}
                <div className="leave-cards">
                    <div className="card">
                        <h3>Total Employees</h3>
                        <p className="card-value">
                            {stats.totalEmployees}
                        </p>
                    </div>
                    <div className="card">
                        <h3>Total Leave Requests</h3>
                        <p className="card-value">
                            {stats.totalLeaves}
                        </p>
                    </div>
                    <div className="card">
                        <h3>Pending Leaves</h3>
                        <p className="card-value">
                            {stats.pendingLeaves}
                        </p>
                    </div>
                    <div className="card">
                        <h3>Approved Leaves</h3>
                        <p className="card-value">
                            {stats.approvedLeaves}
                        </p>
                    </div>
                </div>

                 <button onClick={() => (window.location = "/leaverequests")}>
                    See Leave Requests
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
