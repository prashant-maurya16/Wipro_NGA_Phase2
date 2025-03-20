import axios from "axios";

class RegisterPosterService {
  // Job Poster Registration
  async registerPoster(companyName, city, state, userName, passwordHashed, email, phoneNo) {
    try {
      const response = await axios.post("http://localhost:5093/api/JobPosters", {
        companyName,
        city,
        state,
        userName,
        passwordHashed,
        email,
        phoneNo
      });

      return response.data;
    } catch (error) {
      console.error("Job Poster registration failed:", error.response?.data || error.message);
      return null;
    }
  }
}

export default new RegisterPosterService();
