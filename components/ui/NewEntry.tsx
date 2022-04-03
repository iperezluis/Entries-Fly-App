import React, { ChangeEvent, useContext, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Box, TextField } from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (!inputValue) return;
    console.log({ inputValue });
    addNewEntry(inputValue);
    setInputValue("");
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            placeholder="nueva entrada"
            multiline
            label="nueva entrada"
            helperText={!inputValue && touched && "Ingrese un valor"}
            value={inputValue}
            error={!inputValue && touched}
            onChange={onChangeText}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setIsAddingEntry(false);
                setInputValue("");
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          startIcon={<AddCircleIcon />}
          variant="outlined"
          color="success"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
