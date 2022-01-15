import "tailwindcss/tailwind.css";
import "../styles/index.css";
import "../styles/global.css";

import Head from "next/head";
import Router from "next/router";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import ProgressBar from "@badrap/bar-of-progress";
import { ThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { theme } from "../_Client/theme";
import { wrapper } from "../_Client/redux/store";
import { createEmotionCache } from "../_Client/utils/create-emotion-cache";

const clientSideEmotionCache = createEmotionCache();
const progress = new ProgressBar({
  size: 4,
  delay: 100,
  color: "#FE595E",
  className: "z-50"
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);



const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Anywhere - Stay - Air-BnD</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(App);
