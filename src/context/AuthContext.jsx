import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create AuthContext
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);        // stores logged-in user info
  const [token, setToken] = useState(null);      // JWT token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // login status

  // Load data from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // LOGIN function
  const login = (userData, jwtToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);

    setUser(userData);
    setToken(jwtToken);
    setIsAuthenticated(true);

    toast.success(`Welcome back, ${userData.name}!`);
    // Redirect to dashboard based on role
    if (userData.role === "admin") navigate("/admin/dashboard");
    else if (userData.role === "worker") navigate("/worker/dashboard");
    else navigate("/user/dashboard");
  };

  // LOGOUT function
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
