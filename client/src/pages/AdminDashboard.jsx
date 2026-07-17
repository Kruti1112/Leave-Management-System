import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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

    const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");

    // navigate to admin login
    if (isAdminLoggedIn !== "true") {
        return <Navigate to="/adminlogin" replace />;
    }

    useEffect(() => {
        fetchData();
    }, []);

    //fetch data 
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
        sessionStorage.removeItem("isAdminLoggedIn");
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

                    <li onClick={() => navigate("/leaverequests")}>
                        Leave Requests
                    </li>

                    <li onClick={() => navigate("/monthlyreport")}>
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

                <button onClick={() => navigate("/leaverequests")}>
                    See Leave Requests
                </button>

            </div>
        </div>
    );
}

export default AdminDashboard;