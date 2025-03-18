import axios from "axios";

class AuthService { 
  async login(doctorUserName, doctorPassword) {
    const response = await axios.post("http://localhost:5074/api/Doctor/login", { 
      doctorUserName, 
      doctorPassword 
    });

    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data.token;
    }

    return null;
  }
}

export default new AuthService();
