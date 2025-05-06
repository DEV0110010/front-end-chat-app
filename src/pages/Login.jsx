import {
  useFileHandler,
  useInputValidation,
  useStrongPassword,
} from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
  
  const Login = () => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const toggleLogin = () => setIsLogin((prev) => !prev);
  
    const name = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const bio = useInputValidation("");
    const password = useStrongPassword();
    const avatar = useFileHandler("single");
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const toastId = toast.loading("Logging In...");
  
      setIsLoading(true);
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          `${server}/api/v1/user/login`,
          {
            username: username.value,
            password: password.value,
          },
          config
        );
        dispatch(userExists(data.user));
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
  
      const toastId = toast.loading("Signing Up...");
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append("avatar", avatar.file);
      formData.append("name", name.value);
      formData.append("bio", bio.value);
      formData.append("username", username.value);
      formData.append("password", password.value);
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      try {
        const { data } = await axios.post(
          `${server}/api/v1/user/new`,
          formData,
          config
        );
  
        dispatch(userExists(data.user));
        toast.success(data.message, {
          id: toastId,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    
  
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Paper
              elevation={4}
              sx={{
                width: "100%",
                maxWidth: "400px",
                p: 4,
                borderRadius: "1.5rem",
                background: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
              }}
            >
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h5"
                      textAlign="center"
                      mb={2}
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        color: "#3f51b5",
                        textTransform: "uppercase",
                      }}
                    >
                      Welcome Back
                    </Typography>
                    <form
                      style={{ width: "100%", marginTop: "1rem" }}
                      onSubmit={handleLogin}
                    >
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        value={username.value}
                        onChange={username.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={password.value}
                        onChange={password.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1,
                          fontFamily: '"Montserrat", sans-serif',
                          fontWeight: 600,
                        }}
                        disabled={isLoading}
                      >
                        Login
                      </Button>
                      <Typography
                        textAlign="center"
                        my={2}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          color: "#888",
                        }}
                      >
                        OR
                      </Typography>
                      <Button disabled={isLoading} fullWidth variant="text" onClick={toggleLogin}>
                        Sign Up Instead
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h5"
                      textAlign="center"
                      mb={2}
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        color: "#3f51b5",
                        textTransform: "uppercase",
                      }}
                    >
                      Create Account
                    </Typography>
                    <form
                      style={{ width: "100%", marginTop: "1rem" }}
                      onSubmit={handleSignUp}
                    >
                      <Stack
                        position="relative"
                        width="8rem"
                        height="8rem"
                        margin="auto"
                        mb={2}
                      >
                        <Avatar
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            border: "2px solid #90caf9",
                          }}
                          src={avatar.preview}
                        />
                        <IconButton
                          component="label"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.6)",
                            ":hover": {
                              bgcolor: "rgba(0,0,0,0.8)",
                            },
                          }}
                        >
                          <CameraAltIcon />
                          <VisuallyHiddenInput
                            type="file"
                            onChange={avatar.changeHandler}
                          />
                        </IconButton>
                      </Stack>
                      {avatar.error && (
                        <Typography
                          m={"1rem auto"}
                          width={"fit-content"}
                          display={"block"}
                          color="error"
                          variant="caption"
                        >
                          {avatar.error}
                        </Typography>
                      )}
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        value={name.value}
                        onChange={name.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        value={username.value}
                        onChange={username.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      {username.error && (
                        <Typography color="error" variant="caption">
                          {username.error}
                        </Typography>
                      )}
                      <TextField
                        required
                        fullWidth
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                        value={bio.value}
                        onChange={bio.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={password.value}
                        onChange={password.changeHandler}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          input: { color: "#333" },
                        }}
                      />
                      {password.error && (
                        <Typography color="error" variant="caption">
                          {password.error}
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1,
                          fontFamily: '"Montserrat", sans-serif',
                          fontWeight: 600,
                        }}
                        disabled={isLoading}
                      >
                        Sign Up
                      </Button>
                      <Typography
                        textAlign="center"
                        my={2}
                        sx={{
                          fontFamily: '"Montserrat", sans-serif',
                          color: "#888",
                        }}
                      >
                        OR
                      </Typography>
                      <Button disabled={isLoading} fullWidth variant="text" onClick={toggleLogin}>
                        Log In Instead
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>
        </Container>
      </div>
    );
  };
  
  export default Login;
  