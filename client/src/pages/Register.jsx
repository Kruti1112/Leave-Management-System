import { useState } from "react";

import "../styles/Register.css";

import axios from "axios";



function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [department, setDepartment] = useState("");

    const [designation, setDesignation] = useState("");

    const [photo, setPhoto] = useState(null);

    const [password, setPassword] = useState("");



    function validatePhone(phone) {

        if (phone === "") {

            return "Please enter your phone number";

        }



        if (!phone.startsWith("+")) {

            return "Phone number must start with '+' followed by country code";

        }



        const number = phone.substring(1);



        if (isNaN(number)) {

            return "Phone number must contain only numbers after '+'";

        }



        if (number.length < 8 || number.length > 15) {

            return "Phone number must be between 8 and 15 digits";

        }



        return "";

    }



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



        // Phone validation

        const phoneError = validatePhone(phone);

        if (phoneError !== "") {

            alert(phoneError);

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



        const formData = new FormData();

        formData.append("name", name);

        formData.append("email", email);

        formData.append("phone", phone);

        formData.append("address", address);

        formData.append("department", department);

        formData.append("designation", designation);

        formData.append("password", password);

        if (photo) {

            formData.append("photo", photo);

        }



        axios.post("http://localhost:5000/register", formData, {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        })

            .then((response) => {

                if (response.data.success) {

                    alert(response.data.message);

                    setName("");

                    setEmail("");

                    setPhone("");

                    setAddress("");

                    setDepartment("");

                    setDesignation("");

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

        <div className="auth-shell">

            <div className="auth-card wide">

                <div className="auth-brand">

                    <div className="brand-mark">LM</div>

                    <div>

                        <p className="eyebrow">Employee Portal</p>

                        <h1>Create Account</h1>

                    </div>

                </div>



                <div className="form-group">

                    <label>Full Name</label>

                    <input

                        id="name"

                        type="text"

                        placeholder="Enter your full name"

                        value={name}

                        maxLength={50}

                        onChange={(e) => setName(e.target.value)}

                    />

                </div>



                <div className="form-group">

                    <label>Email ID</label>

                    <input

                        id="email"

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                    />

                </div>



                <div className="form-group">

                    <label>Phone Number</label>

                    <input

                        id="phone"

                        type="text"

                        placeholder="+1234567890"

                        value={phone}

                        onChange={(e) => setPhone(e.target.value)}

                    />

                </div>



                <div className="form-group">

                    <label>Address</label>

                    <input

                        id="address"

                        type="text"

                        placeholder="Enter your address"

                        value={address}

                        maxLength={150}

                        onChange={(e) => setAddress(e.target.value)}

                    />

                </div>



                <div className="form-group">

                    <label>Upload Photo</label>

                    <input

                        id="photo"

                        type="file"

                        accept="image/jpeg,image/jpg,image/png"

                        onChange={(e) => setPhoto(e.target.files[0])}

                    />

                </div>



                <div className="form-group">

                    <label>Password</label>

                    <input

                        id="password"

                        type="password"

                        placeholder="Create a strong password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                    />



                    <small className="password-info">

                        Password must:

                        <ul>

                            <li>Be at least 8 characters long</li>

                            <li>Contain at least one uppercase letter (A-Z)</li>

                            <li>Contain at least one lowercase letter (a-z)</li>

                            <li>Contain at least one number (0-9)</li>

                        </ul>

                    </small>

                </div>



                <button className="auth-btn" onClick={register}>

                    Register

                </button>



                <p className="auth-link">

                    Already have an account? <a href="/login">Login here</a>

                </p>

            </div>

        </div>

    );

}



export default Register;