import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Faq.module.scss";

import { useRouter } from "next/router";

import Searchbar from "../../components/Searchbar";

const categories = [
  {
    name: "Payment",
    image: "payment.svg",
    imageW: 42,
    imageH: 35,
  },
  {
    name: "Returns & refunds",
    image: "returns.svg",
    imageW: 28,
    imageH: 36,
  },
  {
    name: "Guarantees & assurances",
    image: "guarantees.svg",
    imageW: 34,
    imageH: 40,
  },
  {
    name: "Account management",
    image: "account_management.svg",
    imageW: 34,
    imageH: 34,
  },
  {
    name: "Frequency",
    image: "frequency.svg",
    imageW: 34,
    imageH: 34,
  },
];

function Faq() {
  const router = useRouter();

    // Scroll to the top at the first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.faq}>
      <Head>
        <title>FAQ | Polyminds</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Site Description." />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <section className={styles.title}>
        <h1>Hi! How can we help you?</h1>
        <Searchbar />
      </section>

      <section className={styles.categories}>
        {categories.map((category, i) => {
          return (
            <section className={styles.category} key={i} onClick={() => router.push(`/faq/category?c=${i}`)}>
              <section className={styles.imgHolder}>
                <Image
                  src={`/images/faq/${category.image}`}
                  alt={category.name}
                  width={category.imageW}
                  height={category.imageH}
                  layout="responsive"
                  objectFit="contain"
                />
              </section>
              <h3>{category.name}</h3>
            </section>
          );
        })}
      </section>
    </section>
  );
}

export default Faq;
