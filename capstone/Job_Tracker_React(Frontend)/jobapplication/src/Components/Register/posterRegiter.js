import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import posterRegiterService from "../AuthService/posterRegiterService";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const RegisterJobPoster = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        city: "",
        state: "",
        userName: "",
        passwordHashed: "",
        email: "",
        phoneNo: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending request with:", formData);  // Debugging

        const response = await posterRegiterService.registerPoster(
            formData.companyName,
            formData.city,
            formData.state,
            formData.userName,
            formData.passwordHashed,
            formData.email,
            formData.phoneNo
        );

        if (response) {
            setMessage("Registration Successful!");
            setTimeout(() => navigate("/JobPosterLogin"), 1000);
        } else {
            setMessage("Registration Failed. Please try again.");
        }
    };

    return (
        <Container 
        fluid 
        className="d-flex justify-content-center align-items-center min-vh-100 bg-dark"
        style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
    >
        <Card 
            style={{ 
                width: "600px",  // Increased width from 500px to 600px
                padding: "20px",  // Reduced padding to decrease height
                borderRadius: "12px", 
                background: "#343a40", 
                color: "white", 
                boxShadow: "0px 4px 10px rgba(255, 193, 7, 0.2)" 
            }} 
            className="p-3"
        >
            <h3 className="text-center mb-3 text-warning">Register as Job Poster</h3>
            {message && <Alert variant={message.includes("Successful") ? "success" : "danger"}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                {Object.keys(formData).map((field) => (
                    <Form.Group key={field} className="mb-2">  {/* Reduced margin-bottom to decrease height */}
                        <Form.Label className="fw-bold text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control 
                            type={field === "passwordHashed" ? "password" : "text"} 
                            placeholder={`Enter ${field}`} 
                            name={field} 
                            value={formData[field]} 
                            onChange={handleChange} 
                            required 
                            style={{ padding: "8px" }}  // Reduced input field padding to shrink height
                        />
                    </Form.Group>
                ))}
                <Button variant="warning" type="submit" className="w-100 text-dark fw-bold" style={{ borderRadius: "8px", padding: "8px" }}>
                    Register
                </Button>
            </Form>
            <p className="text-center mt-2 text-white">  {/* Reduced margin-top to decrease height */}
                Already have an account? <a href="/JobPosterLogin" className="text-warning fw-bold">Login here</a>
            </p>
        </Card>
    </Container>
    

    );
};

export default RegisterJobPoster;
