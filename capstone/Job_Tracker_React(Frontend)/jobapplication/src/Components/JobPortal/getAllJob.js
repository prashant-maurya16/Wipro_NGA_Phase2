import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import Navbar from "../NavBar/navBar";

const JobPortal = () => {
    const [portals, setPortals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [applicationData, setApplicationData] = useState({
        jobSeekerId: "",
        portalId: "",
        appliedOn: new Date().toISOString().split("T")[0],
        status: "Pending"
    });
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPortals = async () => {
            try {
                const response = await axios.get("http://localhost:5093/api/JobPortal");
                setPortals(response.data);
            } catch (error) {
                console.error("Error fetching portals:", error);
            }
        };

        fetchPortals();
    }, []);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    const handleApply = (portal) => {
        setSelectedPortal(portal);
        setApplicationData({ ...applicationData, portalId: portal.portalId });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5093/api/ApplyJob", applicationData);
            
            // ✅ Set success message with emoji
            setMessage("🎉 Your application has been submitted successfully!");
            setShowMessage(true);
    
            // ✅ Hide message after 2 seconds
            setTimeout(() => setShowMessage(false), 2000);
    
            // ✅ Reset modal and form data
            setShowModal(false);
            setApplicationData({
                jobSeekerId: "",
                portalId: "",
                appliedOn: new Date().toISOString().split("T")[0],
                status: "Pending"
            });
    
        } catch (error) {
            console.error("Error submitting application:", error);
    
            // ❌ Show error message
            setMessage("❌ Failed to submit the application. Please try again.");
            setShowMessage(true);
    
            // Hide error after 2 seconds
            setTimeout(() => setShowMessage(false), 2000);
        }
    };
    

    return (
        <div>
            <Navbar/>
        <Container
            fluid
            className="text-white d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#343a40", minHeight: "100vh", padding: "20px" }}
        >
          
            <h2 className="text-center mb-4 text-warning">Job Portals</h2>
            {showMessage && (
    <Alert variant="success" className="text-center fw-bold"
        style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "1050",  // Ensuring it stays above everything
            fontSize: "18px",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "0", // Removing rounded corners for a banner effect
            textAlign: "center",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
        }}>
        🎉 {message}
    </Alert>
)}


            <Row className="w-100 justify-content-center">
                {portals.map((portal) => (
                    <Col md={4} key={portal.portalId} className="mb-4">
                        <Card className="shadow-sm border-0 text-white"
                            style={{
                                backgroundColor: "#2c3e50",
                                borderRadius: "8px",
                                overflow: "hidden",
                                transition: "transform 0.3s, box-shadow 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0px 8px 16px rgba(255, 193, 7, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <Card.Body>
                                <Card.Title className="fw-bold text-warning">{portal.portalName}</Card.Title>
                                <Card.Text><strong>Job Name:</strong> {portal.jobName}</Card.Text>
                                <Card.Text><strong>Company ID:</strong> {portal.companyId}</Card.Text>
                                <Card.Text><strong>Description:</strong> {portal.jobDescription}</Card.Text>
                                <Card.Text><strong>Positions:</strong> {portal.position}</Card.Text>
                                <Card.Text><strong>Published On:</strong> {portal.publishedOn}</Card.Text>
                                <Card.Text><strong>Status:</strong> {portal.status}</Card.Text>
                                <Button variant="warning" className="w-100 fw-bold" onClick={() => handleApply(portal)}>Apply Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Apply Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2c3e50", color: "white" }}>
                    <Modal.Title>Apply for {selectedPortal?.jobName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#343a40", color: "white" }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Seeker ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter your Job Seeker ID" required
                                value={applicationData.jobSeekerId}
                                onChange={(e) => setApplicationData({ ...applicationData, jobSeekerId: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Portal ID</Form.Label>
                            <Form.Control type="text" value={applicationData.portalId} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Applied On</Form.Label>
                            <Form.Control type="date" required
                                value={applicationData.appliedOn}
                                onChange={(e) => setApplicationData({ ...applicationData, appliedOn: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" value={applicationData.status} disabled />
                        </Form.Group>
                        <Button variant="warning" type="submit" className="w-100 fw-bold">Submit Application</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
        </div>
    );
};

export default JobPortal;
