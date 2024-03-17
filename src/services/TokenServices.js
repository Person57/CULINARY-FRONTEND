import { jwtDecode } from "jwt-decode";

class TokenService {
    static getUserIdFromToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (user.token) {
            try {
                const decodedToken = jwtDecode(user.token);
                return decodedToken._id; // Assuming userId is a property in your JWT payload
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        } else {
            console.warn("No token found in localStorage");
            return null;
        }
    }

    static getEmailFromToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.token) {
            try {
                const decodedToken = jwtDecode(user.token);
                return decodedToken.email; // Assuming email is a property in your JWT payload
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        } else {
            console.warn("No token found in localStorage");
            return null;
        }
    }

    // You can add more methods related to token handling here
}

export default TokenService;
