import Meta from "components/Meta";

import Nav from "components/Nav";
import Footer from "components/Footer";

export default function UI({ children, page, desc, keywords }) {
  return (
    <>
      <Meta page={page} desc={desc} keywords={keywords} />

      <Nav />
      {children}
      <Footer />
    </>
  );
}
