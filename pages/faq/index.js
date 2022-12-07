import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Faq.module.scss";

import { AiOutlineSearch } from "react-icons/ai";

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
  return (
    <section className={styles.faq}>
      <section className={styles.title}>
        <h1>Hi! How can we help you?</h1>
        <section className={styles.searchbar}>
          <input placeholder={"Ask a question..."} />
          <button>
            <AiOutlineSearch />
          </button>
        </section>
      </section>

      <section className={styles.categories}>
        {categories.map((category, i) => {
          return (
            <section className={styles.category} key={i}>
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
