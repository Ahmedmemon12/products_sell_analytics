import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "./Components/Navbar";
import { AppProvider } from "@shopify/polaris";
// import translations from '@shopify/polaris/locales/en.json';
import { useState } from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n";
import { useTranslation } from 'react-i18next';


export default function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider >
          <I18nextProvider i18n={i18n}>
            <Navbar />
            <Outlet context={[count, setCount]} />
            {/* <!-- Start of helpify24 Zendesk Widget script --> */}
            <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=0e459fb0-da43-4473-aa1b-f2f975fb851b"> </script>
            {/* <End of helpify24 Zendesk Widget script  */}
          </I18nextProvider>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

