import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const SignInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Your existing service call
      const response = await loginUser(credentials);
      
      // Store token for session persistence
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("firstName", response.data.firstName || "Scout");
        localStorage.setItem("type", response.data.type || "admin");
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Redirect to the dashboard
      navigate("/dashboard/dash-articles");
    } catch (err) {
      console.error("AUTHENTICATION_ERROR:", err);
      alert("ACCESS_DENIED: Invalid credentials or uplink failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        backgroundImage: "radial-gradient(circle, #0a0a0a 0%, #000000 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#050505",
            border: "1px solid #9d0000",
            boxShadow: "0 0 15px rgba(157, 0, 0, 0.3)",
          }}
        >
          <LockOpenIcon sx={{ fontSize: 40, color: "#9d0000", mb: 2 }} />
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: "#fff", 
              fontWeight: "bold", 
              letterSpacing: 2, 
              mb: 1 
            }}
          >
            TERMINAL_LOGIN
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ color: "#666", mb: 4, textAlign: "center" }}
          >
            Identify yourself to establish secure link
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="UPLINK_EMAIL"
              name="email"
              variant="outlined"
              required
              value={credentials.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#9d0000" },
                },
                "& .MuiInputLabel-root": { color: "#9d0000" },
              }}
            />

            <TextField
              fullWidth
              label="ACCESS_KEY"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#444" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#9d0000" },
                },
                "& .MuiInputLabel-root": { color: "#9d0000" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                backgroundColor: "#9d0000",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#ff0000" },
                "&.Mui-disabled": { backgroundColor: "#330000", color: "#666" }
              }}
            >
              {loading ? "ESTABLISHING..." : "ESTABLISH_LINK"}
            </Button>
          </form>
          
          <Typography 
            variant="caption" 
            sx={{ mt: 3, color: "#333", cursor: "pointer", "&:hover": { color: "#9d0000" } }}
            onClick={() => navigate("/")}
          >
            RETURN_TO_MAIN_COORDINATES
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInPage;