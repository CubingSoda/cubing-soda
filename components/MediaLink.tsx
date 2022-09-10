import React from "react";
import styles from "styles/Home.module.scss";

interface MediaLinkProps {
  name: string;
  img: string;
  href: string;
}

const MediaLink: React.FC<MediaLinkProps> = ({ name, img, href }) => {
  return (
    <a href={href} rel="noreferrer" target="_blank" className={name}>
      <img src={img} alt={`${name}`} className={styles.logo} />
    </a>
  );
};

export default MediaLink;
