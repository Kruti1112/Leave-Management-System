import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Adminlogin.css";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function adminLogin() {

        if (email === "") {
            alert("Please enter your email");
            return;
        }

        if (password === "") {
            alert("Please enter your password");
            return;
        }
        axios.post("http://localhost:5000/adminLogin", {

            email: email,
            password: password

        })
        .then((response) => {
            if (response.data.success) {
                sessionStorage.setItem("adminEmail", email);
                sessionStorage.setItem("isAdminLoggedIn", "true");
                alert(response.data.message);
                navigate("/admindashboard");
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Admin Login Failed");
        });
    }
    return (

        <div className="adminlogin-container">

            <h1>Admin Login</h1>
            <div className="form-group">

                <label>Email ID</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="adminlogin-btn" onClick={adminLogin}>
                Login
            </button>
        </div>
    );
}
export default AdminLogin;