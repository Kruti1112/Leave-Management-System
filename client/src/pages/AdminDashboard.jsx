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

    if (isAdminLoggedIn !== "true") {
        return <Navigate to="/adminlogin" replace />;
    }

    useEffect(() => {
        fetchData();
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
        sessionStorage.removeItem("isAdminLoggedIn");
        navigate("/adminlogin");
    }

    const approvalPercent = stats.totalLeaves > 0
        ? Math.round((stats.approvedLeaves / stats.totalLeaves) * 100)
        : 0;
    const ringStyle = {
        background: `conic-gradient(var(--secondary) ${approvalPercent}%, rgba(108,99,255,0.12) ${approvalPercent}% 100%)`
    };
    const aiText = approvalPercent > 70
        ? "Approval momentum is strong. Most requests are already moving through smoothly."
        : "Follow-up on pending requests will help maintain response speed and consistency.";

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand-mark">LM</div>
                    <h2>Leave<br />Management</h2>
                </div>
                <ul className="sidebar-menu">
                    <li className="active"><span className="nav-icon">◉</span>Dashboard</li>
                    <li onClick={() => navigate("/leaverequests")}><span className="nav-icon">✦</span>Leave Requests</li>
                    <li onClick={() => navigate("/monthlyreport")}><span className="nav-icon">▤</span>Monthly Report</li>
                    <li onClick={logout}><span className="nav-icon">⇢</span>Logout</li>
                </ul>
            </aside>

            <main className="main-content">
                <section className="page-hero">
                    <div className="page-hero-copy">
                        <p className="eyebrow">Operations hub</p>
                        <h3>Monitor approvals, team coverage, and leave demand in one place.</h3>
                    </div>
                    <div className="page-hero-illustration" aria-hidden="true">
                        <svg viewBox="0 0 220 150" width="220" height="150">
                            <rect x="24" y="24" width="172" height="105" rx="24" fill="#fff2ea" />
                            <rect x="44" y="44" width="66" height="46" rx="16" fill="#6d5dfc" />
                            <rect x="124" y="44" width="46" height="22" rx="11" fill="#14b8a6" />
                            <circle cx="72" cy="68" r="11" fill="#ff7a59" />
                            <rect x="54" y="100" width="104" height="10" rx="5" fill="#0f172a" opacity="0.55" />
                            <rect x="124" y="74" width="38" height="10" rx="5" fill="#94a3b8" />
                        </svg>
                    </div>
                </section>

                <section className="welcome-card">
                    <div className="profileimage">K</div>
                    <div className="welcome-details">
                        <p className="eyebrow">Administrator view</p>
                        <h2>Welcome Back</h2>
                        <p><strong>Kruti Patel</strong></p>
                        <p>kruti@gmail.com</p>
                        <p>Monitor leave trends and keep the team aligned.</p>
                        <div className="chip-row">
                            <span className="status-pill">⚡ Live operations</span>
                            <span className="status-pill secondary">{stats.pendingLeaves} pending</span>
                        </div>
                    </div>
                </section>

                <section className="leave-cards">
                    <div className="card">
                        <div className="card-icon">👥</div>
                        <h3>Total Employees</h3>
                        <p className="card-value">{stats.totalEmployees}</p>
                    </div>
                    <div className="card">
                        <div className="card-icon">🗓️</div>
                        <h3>Total Leave Requests</h3>
                        <p className="card-value">{stats.totalLeaves}</p>
                    </div>
                    <div className="card">
                        <div className="card-icon">⏳</div>
                        <h3>Pending Leaves</h3>
                        <p className="card-value">{stats.pendingLeaves}</p>
                    </div>
                    <div className="card">
                        <div className="card-icon">✔️</div>
                        <h3>Approved Leaves</h3>
                        <p className="card-value">{stats.approvedLeaves}</p>
                    </div>
                </section>

                <section className="insight-grid">
                    <article className="insight-card chart-card">
                        <div className="ring-chart" style={ringStyle}>
                            <div className="ring-inner">{approvalPercent}%</div>
                        </div>
                        <div className="insight-details">
                            <h3>Approval Ratio</h3>
                            <p>{stats.approvedLeaves} approved of {stats.totalLeaves} requests</p>
                            <p className="mini-note">Balanced flow across recent approvals</p>
                        </div>
                    </article>
                    <article className="insight-card ai-card">
                        <p className="eyebrow">AI summary</p>
                        <h3>Team pulse</h3>
                        <p>{aiText}</p>
                        <button onClick={() => navigate("/leaverequests")}>Review Requests</button>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;