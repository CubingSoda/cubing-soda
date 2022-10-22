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
  descText = desc ? desc : "My personal website, built using Next.js.";

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
      <meta property="og:image" content="/img/icons/site.png" />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descText} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cubingsoda.pages.dev" />

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      <title>{titleText}</title>
    </Head>
  );
};

export default Meta;
