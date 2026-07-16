import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import AdminLogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/AdminDashboard";
import LeaveRequest from "./pages/LeaveRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ textAlign: "center", padding: "40px 20px 20px" }}>
                <h1 style={{ color: "#2c3e50", fontSize: "34px", marginBottom: "10px" }}>
                  Welcome to the Leave Management App
                </h1>
                <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "0" }}>
                  Apply for leave and manage your requests with ease.
                </p>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                marginTop: "30px",
                padding: "0 20px"
              }}>
                <div style={{
                  width: "320px",
                  padding: "28px 24px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(59, 130, 246, 0.16)",
                  textAlign: "center"
                }}>
                  <h2 style={{ color: "#2c3e50", marginBottom: "14px" }}>Employee Portal</h2>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                    See and manage your leave requests in one place.
                  </p>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", marginBottom: "20px" }}>
                    Apply for leave and track your status anytime.
                  </p>
                  <a href="/login">
                    <button style={{
                      backgroundColor: "#43637E",
                      color: "white",
                      border: "none",
                      padding: "12px 22px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}>
                      Get Started
                    </button>
                  </a>
                </div>

                <div style={{
                  width: "320px",
                  padding: "28px 24px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 80%)",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(59, 130, 246, 0.16)",
                  textAlign: "center"
                }}>
                  <h2 style={{ color: "#2c3e50", marginBottom: "14px" }}>Admin Portal</h2>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                    Manage employee leave requests efficiently.
                  </p>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", marginBottom: "20px" }}>
                    Review leaves and monitor trends from one dashboard.
                  </p>
                  <a href="/adminlogin">
                    <button style={{
                      backgroundColor: "#43637E",
                      color: "white",
                      border: "none",
                      padding: "12px 22px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}>
                      Login Now
                    </button>
                  </a>
                </div>
              </div>
            </>
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

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;