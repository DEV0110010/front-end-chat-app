import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { matBlack, purple } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
        paddingY: 4,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          background: "#fdfdfd",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Typography
          textAlign="center"
          variant="h4"
          sx={{
            marginBottom: "2rem",
            textTransform: "uppercase",
            fontWeight: 600,
            color: purple,
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          {heading}
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{ height: "80%" }}
          sx={{
            border: "none",
            fontFamily: "'Segoe UI', sans-serif",
            transition: "all 0.3s ease-in-out",
            ".table-header": {
              background: "linear-gradient(135deg, #7b2cbf, #9d4edd)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              padding: "0.75rem",
              textTransform: "uppercase",
              transition: "all 0.3s ease-in-out",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
              transition: "background 0.3s ease",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f0f0f0",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f9f9f9",
              borderTop: "1px solid #e0e0e0",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
