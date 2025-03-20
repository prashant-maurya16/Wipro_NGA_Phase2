import axios from "axios";

class JobPosterAuthService { 
  async login(username, passwordHashed) {
    try {
      const response = await axios.post("http://localhost:5093/api/JobPosters/login", { 
        username, 
        passwordHashed 
      });

      if (response.data.token) {
        localStorage.setItem("posterToken", JSON.stringify(response.data.token));
        return response.data.token;
      }
      
      return null;
    } catch (error) {
      console.error("Job Poster Login failed:", error.response?.data || error.message);
      return null;
    }
  }
}

export default new JobPosterAuthService();
