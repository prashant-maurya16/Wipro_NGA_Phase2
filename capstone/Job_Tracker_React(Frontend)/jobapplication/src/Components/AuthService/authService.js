import axios from "axios";

class AuthService { 
  async login(UserName, Password) {
    try {
      const response = await axios.post("http://localhost:5093/api/JobSeeker/login", { 
        UserName, 
        Password 
      });

      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        return response.data.token;
      }
      
      return null;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return null;
    }
  }
}

export default new AuthService();