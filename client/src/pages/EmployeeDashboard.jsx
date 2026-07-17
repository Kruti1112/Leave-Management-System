import "../styles/EmployeeDashboard.css";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function EmployeeDashboard() {

    const [employee, setEmployee] = useState({});
    const [appliedLeaves, setAppliedLeaves] = useState(0);
    const [pendingLeaves, setPendingLeaves] = useState(0);

    const navigate = useNavigate();

    const email = sessionStorage.getItem("email");
    //navigate to login 
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

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className="dashboard">

            <div className="sidebar">
                <h2>Leave Management System</h2>

                <ul>
                    <li>Dashboard</li>

                    <li onClick={() => navigate("/applyleave")}>
                        Apply Leave
                    </li>

                    <li onClick={() => navigate("/leavehistory")}>
                        Leave History
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>
                </ul>
            </div>

            <div className="main">

                <div className="welcome">

                    <div className="profile-image">
                        {employee.name
                            ? employee.name.charAt(0).toUpperCase()
                            : "K"}
                    </div>

                    <div>
                        <h1>Welcome Back!</h1>
                        <h2>{employee.name}</h2>
                        <p>Employee ID: {employee._id}</p>
                        <p>Email: {employee.email}</p>
                    </div>

                </div>

                <div className="cards">

                    <div className="card">
                        <h3>Total Leaves</h3>
                        <h1>50</h1>
                    </div>

                    <div className="card">
                        <h3>Applied Leaves</h3>
                        <h1>{appliedLeaves}</h1>
                    </div>

                    <div className="card">
                        <h3>Pending Leaves</h3>
                        <h1>{pendingLeaves}</h1>
                    </div>

                </div>

                <div className="buttons">

                    <button onClick={() => navigate("/applyleave")}>
                        Apply Leave
                    </button>

                    <button onClick={() => navigate("/leavehistory")}>
                        Leave History
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EmployeeDashboard;