import Head from "next/head";

export default function Meta({ page, desc, keywords }) {
  let titleText;
  titleText = page ? `${page} | CubingSoda` : `CubingSoda`;

  let descText;
  descText = desc
    ? desc
    : "I showcase my projects and make posts every once in awhile. Reddit, Discord, and GitHub links are at the homepage.";

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

      <meta property="og:image" content="/favicons/icon.png" />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descText} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cubingsoda.pages.dev" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#6eb0ff"
      />
      <meta name="msapplication-TileColor" content="#6eb0ff" />
      <meta name="theme-color" content="#6eb0ff" />

      <title>{titleText}</title>
    </Head>
  );
}
