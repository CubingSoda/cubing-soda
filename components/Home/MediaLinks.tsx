import { v4 as uuidv4 } from "uuid";
import styles from "styles/Home.module.scss";

interface MediaLinksProps {
  toggle: boolean;
  open: () => void;
}

const MediaLinks: React.FC<MediaLinksProps> = ({ toggle, open }) => {
  const links = [
    {
      name: "GitHub",
      img: "/img/icons/github.png",
      href: "https://github.com/CubingSoda",
    },
    {
      name: "Reddit",
      img: "/img/icons/reddit.png",
      href: "https://www.reddit.com/user/CubingSoda/",
    },
    {
      name: "Discord",
      img: "/img/icons/discord.png",
      href: "https://discord.com/users/822191907286417450",
    },
    {
      name: "Monkeytype",
      img: "/img/icons/monkeytype.png",
      href: "https://monkeytype.com/profile/cubingsoda",
    },
    {
      name: "Stackoverflow",
      img: "/img/icons/stackoverflow.png",
      href: "https://stackoverflow.com/users/17556679/cubingsoda",
    },
    {
      name: "NPM",
      img: "/img/icons/npm.png",
      href: "https://www.npmjs.com/~cubingsoda",
    },
  ];

  const LinksComponent = () => {
    return (
      <>
        {links.map((link) => {
          return (
            <a
              href={link.href}
              rel="noreferrer"
              target="_blank"
              className={link.name}
              key={uuidv4()}
            >
              <img
                src={link.img}
                alt={`${link.name}`}
                className={styles.logo}
              />
            </a>
          );
        })}
      </>
    );
  };

  return (
    <div className={styles.link}>
      {/* Desktop */}
      <section className={styles.mobile} onClick={open}>
        {toggle ? (
          <i className="fa-solid fa-arrow-down fa-2xl"></i>
        ) : (
          <i className="fa-solid fa-arrow-up fa-2xl"></i>
        )}
        <span>{toggle ? <>Hide</> : <>Show</>} Social Profiles</span>

        <div className="popup-text">
          <LinksComponent />
        </div>
      </section>

      {/* Mobile */}
      <section className={styles.desktop}>
        <LinksComponent />
      </section>
    </div>
  );
};

export default MediaLinks;
