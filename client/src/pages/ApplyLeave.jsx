import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyLeave() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ name: "", email: "", _id: "" });
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        email: "",
        leaveType: "Casual",
        fromDate: "",
        toDate: "",
        totalDays: 1,
        reason: ""
    });

    useEffect(() => {
        const email = sessionStorage.getItem("email");
        if (!email) {
            navigate("/login");
            return;
        }

        axios.get(`http://localhost:5000/employee/${email}`)
            .then((response) => {
                const employeeData = response.data || {};
                setEmployee(employeeData);
                setFormData((prev) => ({
                    ...prev,
                    employeeId: employeeData._id || "",
                    employeeName: employeeData.name || "",
                    email: employeeData.email || email
                }));
            })
            .catch(() => {
                setEmployee({ name: "Employee", email });
                setFormData((prev) => ({
                    ...prev,
                    employeeName: "Employee",
                    email
                }));
            });
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateDays = () => {
        if (!formData.fromDate || !formData.toDate) return 1;
        const start = new Date(formData.fromDate);
        const end = new Date(formData.toDate);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
            return 1;
        }
        const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return diffDays > 0 ? diffDays : 1;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = sessionStorage.getItem("email");
        if (!email) {
            alert("Please log in first");
            navigate("/login");
            return;
        }

        const payload = {
            employeeId: formData.employeeId || employee._id || "",
            employeeName: formData.employeeName || employee.name || "Employee",
            email: formData.email || email,
            leaveType: formData.leaveType,
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            totalDays: calculateDays(),
            reason: formData.reason,
            status: "Pending"
        };

        axios.post("http://localhost:5000/applyleave", payload)
            .then((response) => {
                alert(response.data.message || "Leave request submitted successfully");
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to submit leave request");
            });
    };

    return (
        <div style={{ maxWidth: "640px", margin: "40px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
            <h2 style={{ marginBottom: "20px", color: "#1565c0" }}>Apply Leave</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>Employee Name</label>
                    <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} readOnly style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} readOnly style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>Leave Type</label>
                    <select name="leaveType" value={formData.leaveType} onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
                        <option value="Casual">Casual</option>
                        <option value="Sick">Sick</option>
                        <option value="Annual">Annual</option>
                        <option value="Emergency">Emergency</option>
                    </select>
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>From Date</label>
                    <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>To Date</label>
                    <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>Total Days</label>
                    <input type="number" name="totalDays" value={calculateDays()} min="1" readOnly style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                    <label>Reason</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} rows="4" required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="submit" style={{ padding: "10px 16px", background: "#1565c0", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Submit</button>
                    <button type="button" onClick={() => navigate("/dashboard")} style={{ padding: "10px 16px", background: "#e5e7eb", color: "#111827", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ApplyLeave;
