import React, { useContext } from "react";

import { Collapse, Box, AlertColor, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { EntriesContext } from "../../context/entries";
import FC from "react";

interface Props {
  title: string;
  type: AlertColor | undefined;
  onSuccess?: () => void;
  onCancel?: () => void;
}
export const OnAlert = ({ title, type, onSuccess, onCancel }: Props) => {
  const { isAlert } = useContext(EntriesContext);
  return (
    <Collapse in={isAlert}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Alert
          severity={type}
          sx={{
            display: "flex",
            height: "10vh",
            justifyContent: "center",
            borderRadius: 5,
            opacity: isAlert ? 1 : 0,
          }}
        >
          {title}
          {type === "warning" ? (
            <>
              <Button onClick={onSuccess}>ok</Button>
              <Button onClick={onCancel}>cancelar</Button>
            </>
          ) : (
            <Button onClick={onSuccess}>ok</Button>
          )}
        </Alert>
      </Box>
    </Collapse>
  );
};
