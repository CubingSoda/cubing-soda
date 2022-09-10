import React from "react";
import Head from "next/head";

interface MetaProps {
  page: string;
  desc: string;
  keywords: string[];
}

const Meta: React.FC<MetaProps> = ({ page, desc, keywords }) => {
  let titleText;
  titleText = page ? `${page} | CubingSoda` : `CubingSoda`;

  let descText;
  descText = desc
    ? desc
    : "I showcase my projects and make posts every once in awhile. Reddit, Discord, and GitHub links are on the homepage.";

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {keywords ? (
        <meta
          name="keywords"
          content={`cubingsoda, programming, coding,${keywords.map(
            (keyword) => {
              return ` ${keyword.toLowerCase()}`;
            }
          )}`}
        />
      ) : (
        <meta name="keywords" content="cubingsoda, programming, coding" />
      )}
      <meta name="description" content={descText} />
      <meta property="og:image" content="/favicon.ico" />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descText} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cubingsoda.pages.dev" />

      <meta name="theme-color" content="#4a5b6e" />

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      <title>{titleText}</title>
    </Head>
  );
};

export default Meta;
