import axios from "axios";

class RegisterService {
  // Job Seeker Registration
  async registerSeeker(firstName, lastName, userName, password, domain, qualification, email, mobile) {
    try {
      const response = await axios.post("http://localhost:5093/api/JobSeeker", {
        firstName,
        lastName,
        userName,
        password,
        domain,
        qualification,
        email,
        mobile
      });

      return response.data;
    } catch (error) {
      console.error("Job Seeker registration failed:", error.response?.data || error.message);
      return null;
    }
  }

 
  
}

export default new RegisterService();
