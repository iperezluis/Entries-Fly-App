import React, { useContext } from "react";

import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box } from "@mui/system";
import { UIContext } from "../../context/ui";

export const SideBar = () => {
  const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];
  const { sideOpenMenu, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideOpenMenu} onClose={closeSideMenu}>
      {/* un Box en MaterialUI es lo mismo que un div solo que aqui podemos usar los stylers personalizados */}
      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h4">Menu </Typography>
      </Box>
      <List>
        {menuItems.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 ? <InboxIcon /> : <MarkEmailUnreadIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
