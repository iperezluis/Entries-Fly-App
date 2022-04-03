import React, { FC, useContext, useMemo, DragEvent } from "react";

import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces/entry";
import { EntriesContext } from "../../context/entries";
import { Entrycard } from "./Entrycard";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}
export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  // now we filters the entries by status
  //we'll use  useMemo for memorizer just when the entries have changed
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    //aqui vamos a arrastrar el id que almacenamos en el setData()
    const id = e.dataTransfer.getData("text");
    //ahora buscxamos ese id para traernoslo al updateEntry
    const entry = entries.find((entry) => entry._id === id);
    entry!.status = status;
    updateEntry(entry!);
    endDragging();
    // console.log({ id });
  };
  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.isDragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 190px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <Entrycard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
