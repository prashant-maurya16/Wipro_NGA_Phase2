import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerService from "../AuthService/registerService";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        domain: "",
        qualification: "",
        email: "",
        mobile: ""
    });
    const [message, setMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending data:", formData);
            const response = await registerService.registerSeeker(
                formData.firstName,
                formData.lastName,
                formData.userName,
                formData.password,
                formData.domain,
                formData.qualification,
                formData.email,
                formData.mobile
            );

            if (response) {
                setMessage("🎉 Registration Successful! Redirecting to login...");
                setAlertVariant("success");
                setTimeout(() => navigate("/"), 1000); 
            } else {
                setMessage("❌ Registration Failed. Please try again.");
                setAlertVariant("danger");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.status === 409) {
                setMessage("⚠️ Username already exists. Please choose a different one.");
            } else {
                setMessage("❌ An error occurred. Please try again later.");
            }
            setAlertVariant("danger");
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
                    width: "600px",
                    padding: "20px",
                    borderRadius: "12px", 
                    background: "#343a40", 
                    color: "white", 
                    boxShadow: "0px 4px 10px rgba(255, 193, 7, 0.2)" 
                }} 
                className="p-3"
            >
                <h3 className="text-center mb-3 text-warning">Register as Job Seeker</h3>
                
                {message && <Alert variant={alertVariant}>{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((field) => (
                        <Form.Group key={field} className="mb-2">
                            <Form.Label className="fw-bold text-white">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Form.Label>
                            <Form.Control 
                                type={field === "password" ? "password" : "text"} 
                                placeholder={`Enter ${field}`} 
                                name={field} 
                                value={formData[field]} 
                                onChange={handleChange} 
                                required 
                                style={{ padding: "8px" }}
                            />
                        </Form.Group>
                    ))}
                    <Button 
                        variant="warning" 
                        type="submit" 
                        className="w-100 text-dark fw-bold" 
                        style={{ borderRadius: "8px", padding: "8px" }}
                    >
                        Register
                    </Button>
                </Form>

                <p className="text-center mt-2 text-white">
                    Already have an account? <a href="/" className="text-warning fw-bold">Login here</a>
                </p>
            </Card>
        </Container>
    );
};

export default Register;
