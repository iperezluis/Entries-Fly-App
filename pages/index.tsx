import { useContext, useEffect } from "react";
import type { NextPage } from "next";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "../components/layout";
import { EntryList, NavBar, NewEntry, SideBar } from "../components/ui";
import { Loading } from "../components/ui/Loading";
import { EntriesContext } from "../context/entries";

const Home: NextPage = () => {
  return (
    <Layout title="Home - Open Jira">
      <Loading />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            style={{ backgroundColor: "rgba(250,250,250,0.1)" }}
            sx={{ height: "calc(100vh - 100px)" }}
          >
            <CardHeader title="Pendientes" />
            <CardContent>
              <NewEntry />
              <EntryList status="Pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            style={{ backgroundColor: "rgba(250,250,250,0.1)" }}
            sx={{ height: "calc(100vh - 100px)" }}
          >
            <CardHeader title="En progreso" />
            <CardContent>
              <EntryList status="In-Progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            style={{ backgroundColor: "rgba(250,250,250,0.1)" }}
            sx={{ height: "calc(100vh - 100px)" }}
          >
            <CardHeader title="Completadas" />
            <CardContent>
              <EntryList status="Finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
