import React, { useContext } from "react";
import NextLink from "next/link";

import { MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import { UIContext } from "../../context/ui";

export const NavBar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={0} onClick={openSideMenu}>
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
          <NextLink href="/" passHref>
            <Link underline="none" color="white">
              <Typography>EntriesFly</Typography>
            </Link>
          </NextLink>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
