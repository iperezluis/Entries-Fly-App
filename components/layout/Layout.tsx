import React, { FC } from "react";

import { Box } from "@mui/material";
import Head from "next/head";
import { SideBar, NavBar } from "../ui";

interface Props {
  title?: string;
}
export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <SideBar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
