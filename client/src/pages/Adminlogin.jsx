import { useState } from "react";
import axios from "axios";
import "../styles/Adminlogin.css";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    function adminLogin() {
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

        axios.post("http://localhost:5000/adminLogin", {
            email: email,
            phone: phone,
            password: password,
        })
        .then((response) => {
            if (response.data.success) {
                alert(response.data.message || "Admin Login Successful");
            } else {
                alert(response.data.message || "Invalid Email, Phone number or Password");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Admin Login Failed");
        });
    }

    return (
        <div className="adminlogin-container">
            <h1>Admin Login</h1>
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
            <button onClick={adminLogin}>Login</button>
        </div>
    );
}

export default AdminLogin;