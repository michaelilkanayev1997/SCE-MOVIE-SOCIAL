import React from "react";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import { Typography, useTheme } from "@mui/material";

const GlobalLoading = () => {
  return (
    <>
      <Paper
        sx={{
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      SCE
      <span style={{ color: theme.palette.primary.main }}> MOVIE SOCIAL</span>
    </Typography>
  );
};

export default GlobalLoading;
