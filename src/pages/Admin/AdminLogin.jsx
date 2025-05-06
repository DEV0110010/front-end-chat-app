import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunk/admin";

const AdminLogin = () => {
const {isAdmin} = useSelector((state) => state.auth)

  const secretKey = useInputValidation("");
 const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value))
  };
  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch])
  
if(isAdmin) return <Navigate to="/admin/dashboard"/>
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
        padding: "1rem",
      }}
    >
      <Container component="main" maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
        >
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: "420px",
              p: { xs: 3, sm: 4 },
              borderRadius: "1.75rem",
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9))",
              backdropFilter: "blur(12px)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  mb={3}
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#3f51b5",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome Admin
                </Typography>

                <form onSubmit={submitHandler} style={{ width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    label="Secret Key"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={secretKey.value}
                    onChange={secretKey.changeHandler}
                    sx={{
                      input: {
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "1rem",
                        color: "#333",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 600,
                      fontSize: "1rem",
                      borderRadius: "0.75rem",
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};

export default AdminLogin;
