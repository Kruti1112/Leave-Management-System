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

        if (email === "") {
            alert("Please enter your email");
            return;
        }

        if (phone === "") {
            alert("Please enter your phone number");
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

        axios.post(
            "http://localhost:5000/register",
            employee
        )
        .then((response) => {

            alert("Successfully Registered...");

            console.log(response.data);

            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setPhoto(null);
            setPassword("");

            const photo = document.getElementById("photo");

            if (photo) {
                photo.value = "";
            }

        })
        .catch((error) => {

            console.log(error);

            alert("Registration Failed");

        });

    }


    return(
        <div className="register-container">

            <h1>Employee Registration</h1>

            <div className="form-group">
                <label>Name</label>
                <input 
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Email ID</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    id="phone"
                    type="tel"
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
            </div>

            <button onClick={register}>
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