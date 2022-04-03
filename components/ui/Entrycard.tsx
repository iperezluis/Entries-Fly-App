import { useRouter } from "next/router";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC, DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";

import { Entry, EntryStatus } from "../../interfaces";
import { getFormat } from "../../utils";

interface Props {
  entry: Entry;
}
export const Entrycard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };
  const onDragEnd = () => {
    endDragging();
  };
  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };
  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography>
            {/* {"hace " + entry.createdAt} */}
            {getFormat.getFromDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
