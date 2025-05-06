import React from "react";
import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Light Effects */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #fcb045 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #7f53ac 0%, transparent 70%)",
          bottom: "5%",
          right: "10%",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          zIndex: 1,
          p: { xs: 4, sm: 6 },
          borderRadius: "2rem",
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
          animation: "fadeIn 1s ease-in-out",
          maxWidth: "650px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <ErrorIcon sx={{ fontSize: "6rem", color: "#e84118", mb: 2 }} />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3.5rem", sm: "4.5rem" },
            fontWeight: 900,
            color: "#2f3640",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#353b48",
            mb: 2,
            fontWeight: 700,
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#4b4b4b",
            maxWidth: "500px",
            mx: "auto",
            mb: 4,
            fontSize: "1.1rem",
          }}
        >
          The page you're looking for doesn’t exist or has been moved. Don't worry, let's get you back on track!
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            background:
              "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
            color: "#fff",
            borderRadius: "2rem",
            px: 5,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            transition: "0.3s",
            boxShadow: "0 8px 20px rgba(255, 105, 180, 0.4)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
              transform: "scale(1.05)",
              boxShadow: "0 12px 25px rgba(255, 105, 180, 0.5)",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default NotFound;
