import { memo } from "react";
import { FaLinkedin, FaTelegram, FaGithub } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} تمامی حقوق این سایت متعلق به رضا
          سلطانمرادی می‌باشد.
        </p>
        <p className={styles.legal}>
          استفاده از محتوای این سایت تنها با ذکر منبع مجاز است.
        </p>
        <div className={styles.socials}>
          <a
            href="https://linkedin.com/in/rezasoltanmoradi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://t.me/Reza_Soltanmoradi_1995"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram />
          </a>
          <a
            href="https://github.com/RezaSoltanmoradi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
