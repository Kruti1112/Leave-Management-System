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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
        if (isAdminLoggedIn !== "true") {
            navigate("/adminlogin");
        } else {
            fetchData();
        }
    }, [navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const statsResponse = await axios.get("http://localhost:5000/admin/stats");
            setStats(statsResponse.data);

            const leavesResponse = await axios.get("http://localhost:5000/admin/leaves");
            setLeaves(leavesResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            setLoading(false);
        }
    };

    const handleUpdateStatus = (id, status) => {
        axios.put(`http://localhost:5000/admin/leaves/${id}`, { status })
            .then((response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    fetchData(); 
                } else {
                    alert("Failed to update status");
                }
            })
            .catch((error) => {
                console.error("Error updating status:", error);
                alert("Error updating leave status");
            });
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/adminlogin");
    };

    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        return null;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul className="sidebar-menu">
                <li className="active">Dashboard</li>
                <li onClick={handleLogout} className="logout-btn">Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="main-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-profile">
                        <div className="profile-circle">
                            {(() => {
                                const raw = sessionStorage.getItem("adminName") || sessionStorage.getItem("adminEmail") || "A";
                                const namePart = raw.includes("@") ? raw.split("@")[0] : raw;
                                return namePart ? namePart.charAt(0).toUpperCase() : "A";
                            })()}
                        </div>
                        <div className="profile-details">
                            <h3>{(() => {
                                const raw = sessionStorage.getItem("adminName") || sessionStorage.getItem("adminEmail") || "Admin";
                                return raw.includes("@") ? raw.split("@")[0] : raw;
                            })()}</h3>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading dashboard data...</p>
                    </div>
                ) : (
                    <>
                        {/* Status Cards */}
                        <div className="stats-cards">
                            <div className="card card-blue">
                                <div className="card-info">
                                    <h3>Total Employees</h3>
                                    <p className="card-value">{stats.totalEmployees}</p>
                                </div>
                            </div>
                            <div className="card card-purple">
                                <div className="card-info">
                                    <h3>Total Leave Requests</h3>
                                    <p className="card-value">{stats.totalLeaves}</p>
                                </div>
                            </div>
                            <div className="card card-orange">
                                <div className="card-info">
                                    <h3>Pending Leaves</h3>
                                    <p className="card-value">{stats.pendingLeaves}</p>
                                </div>
                            </div>
                            <div className="card card-green">
                                <div className="card-info">
                                    <h3>Approved Leaves</h3>
                                    <p className="card-value">{stats.approvedLeaves}</p>
                                </div>
                            </div>
                        </div>

                        {/* Leaves Table */}
                        <div className="table-section">
                            <h2>Recent Leave Requests</h2>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Leave Type</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaves.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="no-data">
                                                    No leave requests found.
                                                </td>
                                            </tr>
                                        ) : (
                                            leaves.map((leave) => (
                                                <tr key={leave._id}>
                                                    <td>
                                                        <div className="emp-name">{leave.employeeName}</div>
                                                        <div className="emp-email">{leave.email}</div>
                                                    </td>
                                                    <td><span className="leave-type-badge">{leave.leaveType}</span></td>
                                                    <td>{leave.fromDate}</td>
                                                    <td>{leave.toDate}</td>
                                                    <td>{leave.reason}</td>
                                                    <td>
                                                        <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                                                            {leave.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {leave.status === "Pending" ? (
                                                            <div className="action-buttons">
                                                                <button className="btn-approve" onClick={() => handleUpdateStatus(leave._id, "Approved")}>Approve</button>
                                                                <button className="btn-reject" onClick={() => handleUpdateStatus(leave._id, "Rejected")}>Reject</button>
                                                            </div>
                                                        ) : (
                                                            <span className="no-action">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;