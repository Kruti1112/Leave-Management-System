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
    const [leaves, setLeaves] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
            navigate("/adminlogin");
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
           
            const statsResponse = await axios.get("http://localhost:5000/admin/stats");
            setStats(statsResponse.data);

            const leavesResponse = await axios.get("http://localhost:5000/admin/leaves");
            setLeaves(leavesResponse.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } 
    };

    const UpdateStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/leaves/${id}`, { status });
            if (response.data.success) {
                alert(response.data.message);
                fetchData();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating leave status");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul className="sidebar-menu">
                    <li>Dashboard</li>
                    <li onClick={() => (window.location = "/leaverequests")}>Leave Requests</li>
                    <li onClick={() => (window.location = "/adminlogin")}>Logout</li>
                </ul>
            </div>

            <div className="main-content">
                <div className="welcome-card">
                    <div className="profileimage">K</div>
                    <div>
                        <h2>Welcome Back Admin!</h2>
                        <p>Kruti.</p>
                        <p>Manage employee leave requests here.</p>
                    </div>
                </div>
                    <>
                        <div className="leave-cards">
                            <div className="card">
                                <h3>Total Employees</h3>
                                <p className="card-value">{stats.totalEmployees}</p>
                            </div>
                            <div className="card">
                                <h3>Total Leave Requests</h3>
                                <p className="card-value">{stats.totalLeaves}</p>
                            </div>
                            <div className="card">
                                <h3>Pending Leaves</h3>
                                <p className="card-value">{stats.pendingLeaves}</p>
                            </div>
                            <div className="card">
                                <h3>Approved Leaves</h3>
                                <p className="card-value">{stats.approvedLeaves}</p>
                            </div>
                        </div>
                    </>
            </div>
        </div>
    );
}

export default AdminDashboard;