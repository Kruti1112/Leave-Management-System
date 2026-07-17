import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/MonthlyReport.css";

function MonthlyReport() {

    const [leaves, setLeaves] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const navigate = useNavigate();

    const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");

    // navigate to admin login
    if (isAdminLoggedIn !== "true") {
        return <Navigate to="/adminlogin" replace />;
    }

    function handleSearch() {
        // month and year wise leave 

        if (!selectedMonth || !selectedYear) {
            alert("Please select both month and year");
            return;
        }

        axios.get("http://localhost:5000/admin/monthlyreport/filter", {
            params: {
                month: selectedMonth,
                year: selectedYear
            }
        })
            .then((response) => {
                setLeaves(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Error fetching data");
            });

    }

    function calculateTotalDays(fromDate, toDate) {

        const start = new Date(fromDate);
        const end = new Date(toDate);

        const difference = end - start;

        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1; // milliseconds to day

        return totalDays;
    }

    function logout() {
        sessionStorage.removeItem("isAdminLoggedIn");
        navigate("/adminlogin");
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Leave Management System</h2>
                <ul>
                    <li onClick={() => navigate("/admindashboard")}>
                        Dashboard
                    </li>

                    <li onClick={() => navigate("/leaverequests")}>
                        Leave Requests
                    </li>

                    <li>
                        Monthly Report
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>
                </ul>
            </div>

            <div className="main">

                <h2 className="title">
                    Monthly Leave Report
                </h2>

                <div className="filter-section">
                    <div className="filter-group">
                        <label>Select Month:</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value="">-- Select Month --</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>

                    </div>

                    <div className="filter-group">
                        <label>Select Year:</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">-- Select Year --</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    <button
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>

                {leaves.length > 0 ? (

                    <table className="report-table">

                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Leave Type</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Total Days</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {leaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td>{leave.employeeName}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.fromDate}</td>
                                    <td>{leave.toDate}</td>
                                    <td>{calculateTotalDays(leave.fromDate, leave.toDate)}</td>
                                    <td>{leave.status}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                ) : (

                    <p className="no-records">
                        No leave records found.
                    </p>

                )}

            </div>

        </div>
    );
}

export default MonthlyReport;