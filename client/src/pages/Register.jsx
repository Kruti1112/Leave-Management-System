import { useState } from "react";
import "../styles/Register.css";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");

    function register() {
        if (name === "") {
            alert("Please enter your name");
            return;
        }

        if (name.length > 50) {
            alert("Name must be maximum 50 characters");
            return;
        }

        if (!/^[A-Za-z ]+$/.test(name)) {
            alert("Name must contain only alphabets and spaces");
            return;
        }

        if (email === "") {
            alert("Please enter your email");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        if (phone === "") {
            alert("Please enter your phone number");
            return;
        }

        if (!/^[0-9]+$/.test(phone)) {
            alert("Phone number must contain only numbers");
            return;
        }

        if (phone.length !== 10) {
            alert("Phone number must be exactly 10 digits");
            return;
        }

        if (address === "") {
            alert("Please enter your address");
            return;
        }

        if (photo === null) {
            alert("Please upload your photo");
            return;
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(photo.type)) {
            alert("Photo must be JPG, JPEG or PNG format");
            return;
        }

        if (photo.size > 2 * 1024 * 1024) {
            alert("Photo size must be maximum 2 MB");
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

        if (!/[A-Z]/.test(password)) {
            alert("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            alert("Password must contain at least one lowercase letter");
            return;
        }
        if (!/[0-9]/.test(password)) {
            alert("Password must contain at least one number");
            return;
        }

        const employee = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            photo: photo.name,
            password: password
        };

        axios.post("http://localhost:5000/register", employee)
            .then((response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setAddress("");
                    setPhoto(null);
                    setPassword("");
                    const photoInput = document.getElementById("photo");
                    if (photoInput) {
                        photoInput.value = "";
                    }
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Registration Failed");
            });
    }

    return (
        <div className="register-container">
            <h1>Employee Registration</h1>

            <div className="form-group">
                <label>Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    maxLength={50}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Email ID</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    id="phone"
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Address</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={address}
                    maxLength={150}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Upload Your Photo Here</label>
                <input
                    id="photo"
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-info">
                    <strong>Password must contain:</strong>
                    <ul>
                        <li>Minimum 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                    </ul>
                </div>
            </div>

            <button className="register-btn" onClick={register}>
                Register
            </button>

            <p>
                Already have an account?
                <a href="/login"> Login</a>
            </p>
        </div>
    );
}

export default Register;