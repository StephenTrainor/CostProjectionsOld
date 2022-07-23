import styles from './Components.module.css';

const Footer = (props) => {
    return (
        <div className={styles.linkContainer}>
            <a href={props.href}>{props.linkText}</a>
        </div>
    );
};

Footer.defaultProps = {
    href: "https://iexcloud.io",
    linkText: "Data provided by IEX Cloud"
};

export default Footer;
