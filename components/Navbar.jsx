import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Navbar.module.scss";

import { useScrollYPosition } from "react-use-scroll-position";

import {
  BsFillGearFill,
  BsHouseFill,
  BsInfoCircleFill,
  BsQuestionCircleFill,
  BsTelephoneFill,
} from "react-icons/bs";

const MobileMenu = dynamic(() => import("./MobileMenu"));

const links = [
  {
    title: "Home",
    href: "/#home",
    img: <BsHouseFill />,
  },
  {
    title: "About Us",
    href: "/#about",
    img: <BsInfoCircleFill />,
  },
  {
    title: "Steps",
    href: "/#steps",
    img: <BsFillGearFill />,
  },
  {
    title: "FAQ",
    href: "/faq",
    img: <BsQuestionCircleFill />,
  },
  {
    title: "Contact Us",
    href: "/#contact",
    img: <BsTelephoneFill />,
  },
];

function Navbar() {
  const router = useRouter();

  // State that handles opening and closing of the mobile menu
  const [openMenu, setOpenMenu] = useState(false);

  // Get current Y scroll position and then use it to add border
  // to the navbar once scrollY is more than 0 (user scrolled)
  const scrollY = useScrollYPosition();

  // Values asigned to the top line of the hamburger menu used for rotation
  const topLineVariants = {
    open: { transform: "translateY(350%) rotateZ(45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  // Values asigned to the bottom line of the hamburger menu used for rotation
  const bottomLineVariants = {
    open: { transform: "translateY(-350%) rotateZ(-45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  return (
    <nav
      className={styles.nav}
      style={{
        borderColor: scrollY > 0 ? "rgba(200, 200, 200, 0.125)" : "transparent",
      }}
    >
      <MobileMenu
        open={openMenu}
        links={links}
        setOpen={(open) => setOpenMenu(open)}
      />

      {/* Left Section */}

      <section className={styles.left}>
        <Link href="/">
          <Image
            src={`/images/navbar/logo.svg`}
            alt="SiteBoost Logo Icon"
            width={27}
            height={27}
            className={styles.logo}
          />
        </Link>

        {/* Navbar links */}
        <ul className={styles.links}>
          {links.map((link) => {
            // If we check if pathname includes link.href with link.href being "/", it would
            // be true because "/" is the root, so that is why we in that case check if it
            // exactly the same, and not included in the current pathname

            let activeLink =
              link.href === "/"
                ? router.asPath === link.href
                : router.asPath.includes(link.href);

            return (
              <li
                key={link.href}
                className={activeLink ? styles.active : undefined}
              >
                <Link href={link.href} scroll={false}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Right Section */}
      <section className={styles.right}>
        <Link href="/#contact" scroll={false}>
          <button>Get in touch</button>
        </Link>

        <div
          className={styles.hamburger}
          onClick={() => setOpenMenu(!openMenu)}
          id="hamburger"
        >
          <m.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={topLineVariants}
            id="line1"
          />
          <div
            className={styles.line}
            style={openMenu ? { opacity: 0 } : undefined}
            id="line2"
          />
          <m.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={bottomLineVariants}
            id="line3"
          />
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
