import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Collapse } from "@mui/material";
import { EntriesContext } from "../../context/entries/EntriesContext";

export const Loading = () => {
  const { isLoading } = useContext(EntriesContext);
  return (
    <Collapse in={isLoading}>
      <Box
        sx={{
          position: "absolute",
          justifyContent: "center",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(250,250,250,0.2)",
          zIndex: 999,
        }}
      >
        <CircularProgress sx={{ position: "absolute", top: 290, left: 600 }} />
      </Box>
    </Collapse>
  );
};
