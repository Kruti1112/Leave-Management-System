import "../styles/EmployeeDashboard.css";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const teamPulse = [
    { name: "Ava Singh", role: "Design Lead", status: "Approved", days: "2d" },
    { name: "Rahul Menon", role: "Product", status: "Pending", days: "1d" },
    { name: "Nisha Rao", role: "Operations", status: "Approved", days: "3d" }
];

function EmployeeDashboard() {
    const [employee, setEmployee] = useState({});
    const [appliedLeaves, setAppliedLeaves] = useState(0);
    const [pendingLeaves, setPendingLeaves] = useState(0);
    const [aiInput, setAiInput] = useState("");
    const [chatMessages, setChatMessages] = useState([
        {
            role: "assistant",
            text: "Hello! I can forecast your leave pace, summarize team availability, and suggest the best time to request time off."
        }
    ]);
    const navigate = useNavigate();

    const email = sessionStorage.getItem("email");
    if (!email) {
        return <Navigate to="/login" replace />;
    }

    function getDashboardData() {
        axios.get("http://localhost:5000/employee/" + email)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get("http://localhost:5000/appliedleave/" + email)
            .then((response) => {
                setAppliedLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get("http://localhost:5000/pendingleave/" + email)
            .then((response) => {
                setPendingLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logout() {
        sessionStorage.removeItem("email");
        navigate("/login");
    }

    function handleAiSubmit(event) {
        event.preventDefault();
        const value = aiInput.trim();
        if (!value) return;

        const lower = value.toLowerCase();
        let reply = "I can forecast your leave usage, review team availability, or suggest the right time to plan your next request.";

        if (lower.includes("predict") || lower.includes("forecast") || lower.includes("balance")) {
            reply = `Based on your current pace, your usage is expected to reach about ${Math.min(100, Math.round((appliedLeaves / 50) * 100 + 8))}% of your annual quota by quarter-end.`;
        } else if (lower.includes("team") || lower.includes("colleague") || lower.includes("leave")) {
            reply = "Your team currently has 3 approved leave blocks, 1 pending request, and 2 upcoming planning windows next week.";
        } else if (lower.includes("plan") || lower.includes("next")) {
            reply = "A short leave request early in the week is likely to fit well with current team availability.";
        }

        setChatMessages((prev) => [
            ...prev,
            { role: "user", text: value },
            { role: "assistant", text: reply }
        ]);
        setAiInput("");
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    const annualQuota = 50;
    const usagePercent = Math.min(100, Math.round((appliedLeaves / annualQuota) * 100));
    const remainingDays = annualQuota - appliedLeaves;
    const progressStyle = {
        background: `conic-gradient(#ff7a59 ${usagePercent}%, #f5e8ff ${usagePercent}% 100%)`
    };
    const insightText = usagePercent > 70
        ? "You are nearing your annual leave limit. Planning ahead helps keep your schedule balanced."
        : "You are pacing well. A few planned days ahead can keep your leave balance healthy.";
    const suggestions = ["Predict my balance", "Team leaves outlook", "Plan my next request"];

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand-mark">LM</div>
                    <h2>Leave<br />Management</h2>
                </div>
                <ul>
                    <li className="active"><span className="nav-icon">◉</span>Dashboard</li>
                    <li onClick={() => navigate("/applyleave")}><span className="nav-icon">✦</span>Apply Leave</li>
                    <li onClick={() => navigate("/leavehistory")}><span className="nav-icon">▤</span>Leave History</li>
                    <li onClick={logout}><span className="nav-icon">⇢</span>Logout</li>
                </ul>
            </aside>

            <main className="main">
                <section className="page-hero">
                    <div className="page-hero-copy">
                        <p className="eyebrow">Live leave intelligence</p>
                        <h3>Stay ahead of requests and balance your time-off plan.</h3>
                    </div>
                    <div className="page-hero-illustration" aria-hidden="true">
                        <svg viewBox="0 0 220 150" width="220" height="150">
                            <rect x="20" y="24" width="180" height="110" rx="24" fill="#fff2ea" />
                            <rect x="44" y="48" width="70" height="55" rx="16" fill="#6d5dfc" />
                            <rect x="128" y="44" width="48" height="24" rx="12" fill="#14b8a6" />
                            <circle cx="70" cy="72" r="12" fill="#ff7a59" />
                            <rect x="60" y="96" width="90" height="10" rx="5" fill="#0f172a" opacity="0.55" />
                            <rect x="128" y="76" width="34" height="10" rx="5" fill="#94a3b8" />
                        </svg>
                    </div>
                </section>

                <section className="welcome-card">
                    <div className="avatar-wrap">
                        {employee.photo ? (
                            <img className="profile-image" src={`http://localhost:5000${employee.photo}`} alt="profile" />
                        ) : (
                            <div className="profile-image profile-fallback">
                                {employee.name ? employee.name.charAt(0).toUpperCase() : "K"}
                            </div>
                        )}
                    </div>
                    <div className="welcome-details">
                        <p className="eyebrow">Welcome back</p>
                        <h2>{employee.name || "Employee"}</h2>
                        <p><strong>Employee ID:</strong> {employee._id || "—"}</p>
                        <p><strong>Email:</strong> {employee.email || "—"}</p>
                        <div className="chip-row">
                            <span className="status-pill">⚡ Live insights</span>
                            <span className="status-pill secondary">{remainingDays} days left</span>
                        </div>
                    </div>
                </section>

                <section className="stats-grid">
                    <div className="stat-card">
                        <h3>Annual Quota</h3>
                        <p className="stat-value">{annualQuota}</p>
                        <p className="meta-text">50 days available</p>
                    </div>
                    <div className="stat-card">
                        <h3>Applied Leaves</h3>
                        <p className="stat-value">{appliedLeaves}</p>
                        <p className="meta-text">Current usage</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pending Leaves</h3>
                        <p className="stat-value">{pendingLeaves}</p>
                        <p className="meta-text">Awaiting review</p>
                    </div>
                </section>

                <section className="insight-grid">
                    <article className="insight-card chart-card">
                        <div className="ring-chart" style={progressStyle}>
                            <div className="ring-inner">{usagePercent}%</div>
                        </div>
                        <div className="insight-details">
                            <h3>Leave Usage</h3>
                            <p>{appliedLeaves} of {annualQuota} days used</p>
                            <p className="mini-note">{insightText}</p>
                            <div className="mini-chart" aria-hidden="true">
                                <span className="bar one" />
                                <span className="bar two" />
                                <span className="bar three" />
                                <span className="bar four" />
                            </div>
                        </div>
                    </article>
                    <article className="insight-card ai-card">
                        <p className="eyebrow">AI assistant</p>
                        <h3>Smart guidance</h3>
                        <p>{insightText}</p>
                        <div className="suggestion-row">
                            {suggestions.map((item) => (
                                <button key={item} type="button" className="suggestion-chip" onClick={() => setAiInput(item)}>{item}</button>
                            ))}
                        </div>
                        <button onClick={() => navigate("/applyleave")}>Plan New Leave</button>
                    </article>
                </section>

                <section className="team-card">
                    <div className="team-card-header">
                        <div>
                            <p className="eyebrow">Team pulse</p>
                            <h3>Upcoming leave activity</h3>
                        </div>
                        <span className="status-pill secondary">Live</span>
                    </div>
                    <div className="team-list">
                        {teamPulse.map((person) => (
                            <div className="team-item" key={person.name}>
                                <div>
                                    <p className="team-name">{person.name}</p>
                                    <p className="team-role">{person.role}</p>
                                </div>
                                <div className="team-meta">
                                    <span className={`team-status ${person.status.toLowerCase()}`}>{person.status}</span>
                                    <span className="team-days">{person.days}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="ai-panel">
                    <div className="team-card-header">
                        <div>
                            <p className="eyebrow">AI chat</p>
                            <h3>Ask for a forecast</h3>
                        </div>
                    </div>
                    <div className="chat-window">
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <form className="chat-form" onSubmit={handleAiSubmit}>
                        <input
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            placeholder="Try: predict my leave balance or team leave outlook"
                        />
                        <button type="submit">Ask</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default EmployeeDashboard;