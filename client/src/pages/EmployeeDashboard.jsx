import "../styles/EmployeeDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeDashboard() {
    const [employee, setEmployee] = useState({});
    const [appliedLeaves,setAppliedLeaves]=useState(0);
    const [pendingLeaves,setPendingLeaves]=useState(0);
    const [leaveList,setLeaveList]=useState([]);
    const [imgError, setImgError] = useState(false);
    const [prevPhoto, setPrevPhoto] = useState(null);

    if (employee.photo !== prevPhoto) {
        setPrevPhoto(employee.photo);
        setImgError(false);
    }

    useEffect(() => {
        const email = sessionStorage.getItem("email");

        axios.get("http://localhost:5000/employee/" + email)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axios.get("http://localhost:5000/appliedleave/" + email)
            .then((response)=>{
                setAppliedLeaves(response.data);
            });

            axios.get("http://localhost:5000/pendingleave/"+email)
            .then((response)=>{
                setPendingLeaves(response.data);
            });

            axios.get("http://localhost:5000/leavehistory/"+email)
            .then((response)=>{
                setLeaveList(response.data);
            });
        }, []);

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Leave Management System</h2>
                
                <ul>
                    <li>Dashboard</li>
                    <li onClick={() => window.location = "/applyleave"}>
                        Apply Leave
                    </li>
                    <li onClick={() => window.location = "/leavehistory"}>
                        Leave History   
                    </li>
                    <li onClick={() => window.location = "/login"}>
                        Logout
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="main">
                {/* Welcome Section */}
                <div className="welcome">
                    {employee.photo && !imgError ? (
                        <img
                            src={`http://localhost:5000/uploads/${employee.photo}`}
                            alt={employee.name || "Employee Photo"}
                            className="profile-image"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="profile-image">
                            {employee.name ? employee.name.charAt(0).toUpperCase() : "K"}
                        </div>
                    )}
                    <div className="welcomeCard">
                        <h1>Welcome Back!</h1>
                        <h2>{employee.name}</h2>
                        <p>Employee ID : {employee._id}</p>
                        <p>Email : {employee.email}</p>
                    </div>
                </div>
                {/* Leave Cards */}
                <div className="cards">
                    <div className="card card-total">
                        <h3>Total Leaves</h3>
                        <h1>50</h1>
                    </div>
                    <div className="card card-applied">
                        <h3>Applied Leaves</h3>
                        <h1>{appliedLeaves}</h1>
                    </div>
                    <div className="card card-pending">
                        <h3>Pending Leaves</h3>
                        <h1>{pendingLeaves}</h1>
                    </div>
                </div>
                {/* Buttons */}
                <div className="buttons">
                    <button onClick={()=>window.location="/applyleave"}>
                        Apply Leave
                    </button>
                    <button onClick={()=>window.location="/leavehistory"}>Leave History</button>
                </div>
              
            </div>
        </div>
    );
}
export default EmployeeDashboard;