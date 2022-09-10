import React from "react";
import Script from "next/script";

import "styles/theme.scss";
import "styles/globals.scss";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div id="app">
      {/* Font Awesome */}
      <Script src="https://kit.fontawesome.com/3b71d7827d.js"></Script>

      <Component {...pageProps} />
    </div>
  );
};

export default App;
