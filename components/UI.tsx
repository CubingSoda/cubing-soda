import React from "react";
import Meta from "components/Meta";

import Nav from "components/Nav";
import Footer from "components/Footer";

interface UIProps {
  children: React.ReactNode;
  page?: string;
  desc?: string;
  keywords?: string[];
}

const UI: React.FC<UIProps> = ({ children, page, desc, keywords }) => {
  return (
    <>
      <Meta page={page} desc={desc} keywords={keywords} />

      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default UI;
