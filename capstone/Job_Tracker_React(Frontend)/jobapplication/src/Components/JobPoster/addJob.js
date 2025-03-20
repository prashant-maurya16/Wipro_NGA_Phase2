import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import Navbar from "../NavBar/navBar";

const AddJob = () => {
    const [formData, setFormData] = useState({
        portalName: "",
        jobName: "",
        companyId: "",
        jobDescription: "",
        position: "",
        publishedOn: "",
        status: "",
        endComments: ""
    });

    const [message, setMessage] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5093/api/JobPortal", formData);
            if (response.status >= 200 && response.status < 300) {
                setMessage("You have added 1 job! ✅");
                setFormData({
                    portalName: "",
                    jobName: "",
                    companyId: "",
                    jobDescription: "",
                    position: "",
                    publishedOn: "",
                    status: "",
                    endComments: ""
                });
            } else {
                setMessage("Failed to add job. Try again.");
            }
        } catch (error) {
            setMessage("Failed to add job. Try again.");
            console.error(error);
        }
    };

    if (userRole === "jobSeeker") {
        return (
            <>
                <Navbar />
                <Container
                    fluid
                    className="d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "#343a40", minHeight: "100vh", padding: "20px" }}
                >
                    <Alert variant="danger" className="text-center p-4">
                        <h4>You are not authorized to add jobs!</h4>
                    </Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#343a40", minHeight: "100vh", paddingTop: "60px" }}
            >
                <Card
                    className="p-3 text-white"
                    style={{
                        width: "500px",
                        backgroundColor: "#2c3e50",
                        borderRadius: "8px",
                        boxShadow: "0px 8px 16px rgba(255, 193, 7, 0.2)",
                        padding: "20px",
                        maxHeight: "80vh",
                        overflowY: "auto"
                    }}
                >
                    {message && (
                        <Alert variant={message.includes("✅") ? "success" : "danger"} className="text-center p-2">
                            {message}
                        </Alert>
                    )}
                    <h4 className="text-center mb-3 text-warning">Add Job</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Portal Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="portalName"
                                value={formData.portalName}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Job Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobName"
                                value={formData.jobName}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Company ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="companyId"
                                value={formData.companyId}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Job Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                rows={2}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Published On</Form.Label>
                            <Form.Control
                                type="date"
                                name="publishedOn"
                                value={formData.publishedOn}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="text-light">End Comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="endComments"
                                value={formData.endComments}
                                onChange={handleChange}
                                rows={2}
                                className="bg-dark text-white border-0"
                            />
                        </Form.Group>
                        <Button variant="warning" type="submit" className="w-100 fw-bold">
                            Add Job
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default AddJob;   