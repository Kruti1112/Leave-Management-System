import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import AdminLogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/AdminDashboard";
import LeaveRequest from "./pages/LeaveRequest";
import MonthlyReport from "./pages/MonthlyReport";

function App() {
  const FeaturePill = ({ icon, text }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 12px 35px rgba(99,102,241,0.12)" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", color: "#fff", fontSize: "14px" }}>
        {icon}
      </span>
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#6B7280" }}>{text}</span>
    </div>
  );

  const HeroIllustration = () => (
    <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: "10px", borderRadius: "32px", background: "linear-gradient(135deg, rgba(255,122,89,0.22), rgba(109,93,252,0.18))", filter: "blur(45px)", zIndex: 0 }} />
      <div style={{ position: "relative", padding: "22px", borderRadius: "32px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 12px 35px rgba(99,102,241,0.12)", zIndex: 1 }}>
        <svg viewBox="0 0 480 360" width="100%" height="auto" role="img" aria-label="Cartoon illustration of a leave management dashboard">
          <rect x="40" y="60" width="400" height="250" rx="28" fill="#f8fbff" />
          <rect x="70" y="95" width="150" height="80" rx="18" fill="#dbeafe" />
          <rect x="250" y="95" width="140" height="60" rx="16" fill="#e0f2fe" />
          <rect x="70" y="200" width="320" height="78" rx="18" fill="#eef2ff" />
          <circle cx="110" cy="135" r="16" fill="#ff7a59" />
          <rect x="135" y="122" width="60" height="10" rx="5" fill="#6d5dfc" />
          <rect x="135" y="142" width="44" height="10" rx="5" fill="#64748b" />
          <rect x="282" y="116" width="72" height="12" rx="6" fill="#14b8a6" />
          <rect x="282" y="138" width="54" height="10" rx="5" fill="#94a3b8" />
          <rect x="92" y="223" width="120" height="16" rx="8" fill="#ff7a59" />
          <rect x="92" y="248" width="90" height="12" rx="6" fill="#64748b" />
          <circle cx="340" cy="225" r="26" fill="#f59e0b" />
          <path d="M334 208l8 12 12-20" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M255 130c18-18 47-19 69-8" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="330" cy="130" r="12" fill="#ffb36b" />
          <circle cx="368" cy="118" r="10" fill="#a78bfa" />
        </svg>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#EEF2FF 0%,#E9D5FF 50%,#F8FAFC 100%)", padding: "40px 20px" }}>
              <style>{`
                @keyframes floatCard {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
              `}</style>
              <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "28px", alignItems: "center", padding: "12px 0" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", padding: "10px 16px", borderRadius: "999px", marginBottom: "16px" }}>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff7a59" }} />
                      <span style={{ color: "#6C63FF", fontWeight: 700, fontSize: "14px" }}>Smart leave workflow</span>
                    </div>
                    <h1 style={{ color: "#1F2937", fontSize: "clamp(2rem, 4vw, 3.4rem)", marginBottom: "10px", lineHeight: 1.15, fontWeight: 700 }}>
                      Leave management that feels effortless
                    </h1>
                    <p style={{ color: "#6B7280", fontSize: "15px", maxWidth: "640px", margin: "0 0 20px 0", lineHeight: 1.8 }}>
                      Simplify approvals, keep teams aligned, and make leave planning transparent with a polished dashboard built for modern organizations.
                    </p>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
                      <a href="/login" style={{ textDecoration: "none" }}>
                        <button className="primary-btn" style={{ padding: "12px 20px", borderRadius: "14px", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", color: "white", border: "none", boxShadow: "0 8px 20px rgba(124,58,237,0.35)", transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease" }}>
                          Employee Login
                        </button>
                      </a>
                      <a href="/adminlogin" style={{ textDecoration: "none" }}>
                        <button className="primary-btn" style={{ padding: "12px 20px", borderRadius: "14px", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", color: "white", border: "none", boxShadow: "0 8px 20px rgba(124,58,237,0.35)", transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease" }}>
                          Admin Login
                        </button>
                      </a>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <FeaturePill icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>} text="Fast approvals" />
                      <FeaturePill icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} text="Team visibility" />
                      <FeaturePill icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z" /></svg>} text="Secure access" />
                    </div>
                  </div>

                  <div style={{ animation: "floatCard 4s ease-in-out infinite" }}>
                    <HeroIllustration />
                  </div>
                </div>

                <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                  <div style={{ padding: "28px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: "20px", boxShadow: "0 12px 35px rgba(99,102,241,0.12)", border: "1px solid rgba(255,255,255,0.3)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", color: "#fff", marginBottom: "14px" }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <h2 style={{ color: "#1F2937", marginBottom: "10px", fontSize: "28px", fontWeight: 700 }}>Employee Portal</h2>
                    <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "16px", fontSize: "15px" }}>
                      Apply for leave, check approvals, and manage your time off with calm, clear insights.
                    </p>
                    <a href="/login" style={{ textDecoration: "none" }}>
                      <button className="primary-btn" style={{ padding: "12px 20px", borderRadius: "14px", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", color: "white", border: "none", boxShadow: "0 8px 20px rgba(124,58,237,0.35)", transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease" }}>
                        Get Started
                      </button>
                    </a>
                  </div>

                  <div style={{ padding: "28px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: "20px", boxShadow: "0 12px 35px rgba(99,102,241,0.12)", border: "1px solid rgba(255,255,255,0.3)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", color: "#fff", marginBottom: "14px" }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                    </div>
                    <h2 style={{ color: "#1F2937", marginBottom: "10px", fontSize: "28px", fontWeight: 700 }}>Admin Portal</h2>
                    <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "16px", fontSize: "15px" }}>
                      Review requests, monitor monthly trends, and keep workloads balanced with AI-style summaries.
                    </p>
                    <a href="/adminlogin" style={{ textDecoration: "none" }}>
                      <button className="primary-btn" style={{ padding: "12px 20px", borderRadius: "14px", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", color: "white", border: "none", boxShadow: "0 8px 20px rgba(124,58,237,0.35)", transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease" }}>
                        Login Now
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/applyleave" element={<ApplyLeave />} />
        <Route path="/leavehistory" element={<LeaveHistory />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/leaverequests" element={<LeaveRequest />} />
        <Route path="/monthlyreport" element={<MonthlyReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
