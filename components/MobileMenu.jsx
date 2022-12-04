/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/MobileMenu.module.scss";

import { useDetectClickOutside } from "react-detect-click-outside";

function MobileMenu({ open, links, setOpen }) {
  const router = useRouter();

  const [animationFinished, setAnimationFinished] = useState(false);

  // Used for closing the menu on the click outside the menu itself
  const ref = useDetectClickOutside({
    onTriggered: (ctx) => {
      // Check if it is open already and if the click is not coming from the hamburger icon click which opens the menu
      if (
        open &&
        !["hamburger", "line1", "line2", "line3"].includes(ctx.target.id)
      ) {
        setOpen(false);
      }
    },
  });

  // Values asigned to the mobile menu depending on its state
  const menuVariants = {
    open: { opacity: 1, height: "100%", display: "flex" },
    closed: { opacity: 0.5, height: "0%", display: "flex" },
  };

  // Values asigned to the container depending on mobile menu open state
  // If it is open, it will play the opening animation, else it will play closing or finished,
  // Depending on the state of the closing animation
  const containerVariants = {
    open: { opacity: 1, display: "flex" },
    closing: { opacity: 0, display: "flex" },
    finished: { opacity: 0, display: "none" },
  };

  // Used to turn off display on mobile menu after animation
  // is finished so it doesn't finish instantly
  useEffect(() => {
    if (!open) {
      document.body.style.overflowY = "unset";

      const timeout = setTimeout(() => {
        setAnimationFinished(true);
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      document.body.style.overflowY = "hidden";
      setAnimationFinished(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [router.asPath]);

  return (
    <motion.main
      animate={open ? "open" : animationFinished ? "finished" : "closing"}
      transition={{ duration: 0.3, type: "tween" }}
      variants={containerVariants}
      className={styles.container}
    >
      <motion.section
        animate={open ? "open" : "closed"}
        transition={{ duration: 0.2, type: "tween" }}
        variants={menuVariants}
        className={styles.menu}
        ref={ref}
      >
        {/* Map through all of the links, and put them as list elements in unordered list element (ul) */}
        <ul>
          {links.map((link, i) => {
            return (
              <li key={i}>
                {link.img}

                <Link href={link.href} scroll={false}>
                  <p>{link.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.section>
    </motion.main>
  );
}

export default MobileMenu;
