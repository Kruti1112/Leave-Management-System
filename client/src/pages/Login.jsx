import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login() {
        if (emailOrPhone === "") {
            alert("Please enter your email or phone number");
            return;
        }

        if (password === "") {
            alert("Please enter your password");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        axios.post("http://localhost:5000/login", {
            emailOrPhone: emailOrPhone,
            password: password,
        })
        .then((response) => {
            if (response.data.success) {
                sessionStorage.setItem("email", response.data.employee.email);
                alert(response.data.message || "Login Successful");
                navigate("/dashboard");
            } else {
                alert(response.data.message || "Invalid Email/Phone Number or Password");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Login Failed");
        });
    }

    return (
        <div className="login-container">
            <h1>Employee Login</h1>
            <div className="form-group">
                <label>Email ID or Phone Number</label>
                <input id="emailOrPhone" type="text" placeholder="Email ID or Phone Number" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-btn" onClick={login}>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;