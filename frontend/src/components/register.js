import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const { firstName, lastName, email, password, phoneNumber } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { firstName, lastName, email, password, phoneNumber };

        try {
            const response = await axios.post('http://localhost:5000/register', newUser);
            console.log('User registered:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
        }
    };

    return (
        <div className="registration">
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Create Account</h2>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
        </div>
    );
};

export default Register;
