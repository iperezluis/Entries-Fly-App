import { EntriesProvider } from "../context/entries/EntriesProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { dark, ligth } from "../Themes";
import { UIProvider } from "../context/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={dark}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp;
