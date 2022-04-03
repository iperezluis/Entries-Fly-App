import React, { ChangeEvent, useState, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { dbEntries } from "../../database";

import Alert from "@mui/material/Alert";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
  Box,
  Collapse,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";

import { Layout } from "../../components/layout/Layout";
import { EntryStatus, Entry } from "../../interfaces/entry";
import { EntriesContext } from "../../context/entries";
import { OnAlert } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";

const validStatus: EntryStatus[] = ["Pending", "In-Progress", "Finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState<string>(entry.description);
  const [touched, setTouched] = useState<boolean>(false);
  const [pushDelete, setPushDelete] = useState(false);
  const [pushUpdate, setPushUpdate] = useState(false);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const { deleteEntry, updateEntry, isAlert, setIsAlert } =
    useContext(EntriesContext);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    setPushUpdate(true);
    const isUpdateEntry: Entry = {
      ...entry,
      description: inputValue,
      status: status,
    };
    updateEntry(isUpdateEntry);
    // console.log({ status, inputValue });
  };
  const onDelete = () => {
    setPushDelete(true);
    setIsAlert(true);
  };
  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Loading />
      {pushDelete && isAlert ? (
        <OnAlert
          title=" ¿Seguro que quiere eliminar esta entrada?"
          type="warning"
          onSuccess={async () => {
            await deleteEntry(entry._id);
            setIsAlert(false);
          }}
          onCancel={() => setIsAlert(false)}
        />
      ) : (
        !pushDelete &&
        isAlert && (
          <OnAlert
            title="Su entrada ha sido asctualizada con exito"
            type="success"
            onSuccess={() => setIsAlert(false)}
          />
        )
      )}
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue.substring(0, 25) + "..."}`}
              subheader="creado hace 0 minutos"
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                autoFocus
                placeholder="Actualizar Entrada"
                multiline
                label="Nueva Entrada"
                value={inputValue}
                onChange={onChangeText}
                onBlur={() => setTouched(true)}
                helperText={
                  inputValue.length <= 0 && touched && "Ingrese un valor"
                }
                error={inputValue.length <= 0 && touched}
              />
              <FormControl>
                <FormLabel>Status: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                      // checked
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAsIcon />}
                variant="contained"
                fullWidth
                disabled={!inputValue ? true : false}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDelete}
      >
        <AutoDeleteIcon />
      </IconButton>
    </Layout>
  );
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here
  //aqui no vmaos a usar nuestra api ya que el backend lo hicimos aqui mismo ya tengo la informacion directamente asi que el ctx tiene todo
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntriesById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};
export default EntryPage;
