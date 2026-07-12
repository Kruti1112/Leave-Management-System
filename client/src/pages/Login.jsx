import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login() {
        if (email === "") {
            alert("Please enter your email");
            return;
        }

        if (phone === "") {
            alert("Please enter your phone number");
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
            email: email,
            phone: phone,
            password: password,
        })
        .then((response) => {
            if (response.data.success) {
                alert(response.data.message || "Login Successful");
                navigate("/dashboard");
            } else {
                alert(response.data.message || "Invalid Email, Phone number or Password");
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
                <label>Email ID</label>
                <input id="email" type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input id="phone" type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={login}>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;