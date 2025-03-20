import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import posterAuth from "../AuthService/posterAuth";
import { Card, Form, Button, Alert } from "react-bootstrap";

const JobPosterLogin = () => {
    const [username, setUsername] = useState("");
    const [passwordHashed, setPasswordHashed] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuthenticated = await posterAuth.login(username, passwordHashed);
        
        if (isAuthenticated) {
            setSuccess("Successfully logged in!");
            setTimeout(() => navigate("/addJob"), 2000);  // Redirect to Add Job page
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 vh-100 bg-dark">
            <Card style={{ borderRadius: "12px", background: "#343a40", color: "white", boxShadow: "0px 4px 10px rgba(255, 193, 7, 0.2)" }} 
                  className="p-4 w-50 w-md-75 w-sm-100">
                <h3 className="text-center mb-3 text-warning">Login as Job Poster</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold text-white">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold text-white">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={passwordHashed} onChange={(e) => setPasswordHashed(e.target.value)} required />
                    </Form.Group>
                    <Button variant="warning" type="submit" className="w-100 text-dark fw-bold" style={{ borderRadius: "8px" }}>Login</Button>
                </Form>
                <p className="text-center mt-3 text-white">Don't have an account? <a href="/registerJobPoster" className="text-warning fw-bold">Register here</a></p>
            </Card>
        </div>
    );
};

export default JobPosterLogin;
