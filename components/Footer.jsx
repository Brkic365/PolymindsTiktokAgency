import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.scss";

const links = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About Us",
    href: "#about",
  },
  {
    title: "Steps",
    href: "#steps",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.top}>
        <section className={styles.logo}>
          <section className={styles.logoHolder}>
            <Image
              src={`/images/navbar/logo.svg`}
              alt="SiteBoost Logo Icon"
              width={50}
              height={50}
              layout="responsive"
              objectFit="contain"
              className={styles.logo}
            />
          </section>
          <h1>Polyminds</h1>
        </section>

        <ul className={styles.links}>
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href} scroll={false}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.bottom}>
        <p className={styles.copyright}>
          © 2022 Polyminds. All rights reserved
        </p>

        <section className={styles.middleLinks}>
          <Link href={"/#contact"}>Contact Us</Link>
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/terms-of-service"}>Terms of Services</Link>
        </section>

        <section className={styles.paymentMethods}>
          <Image
            src={`/images/footer/paymentMethods.svg`}
            alt="Payment methods"
            width={145}
            height={36}
            className={styles.paymentMethodsImg}
          />
        </section>
      </section>
    </footer>
  );
}

export default Footer;
