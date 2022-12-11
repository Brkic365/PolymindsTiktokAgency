import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Category.module.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

import { useRouter } from "next/router";

import Searchbar from "../../components/Searchbar";

import allQuestions from "../../public/data/questions.json";

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

function Category() {
  const router = useRouter();

  const [categoryIndex, setCategoryIndex] = useState(null);

  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState(null);

  const findCategory = () => {

    if(!categoryIndex) {
      return;
    }

    allQuestions.forEach((_category, i) => {
        if(i === parseInt(categoryIndex)) {
            setQuestions(_category.questions);
            setCategory(categories[i]);
          }
    });
  }

  useEffect(() => {
    findCategory();
  }, [categoryIndex]);

  // Scroll to the top at the first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCategoryIndex(router.query.c);
  }, [router.query]);

  if(!category || !questions) {
    return null;
  }

  return (
    <section className={styles.search}>
      <Head>
        <title>{category.name} | Polyminds</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Site Description." />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <section className={styles.top}>
        <Searchbar />
      </section>

      <section className={styles.content}>
        <section className={styles.path}>
            <IoChevronBackOutline  onClick={() => router.back()}/>
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
            <h2>{category.name}</h2>
        </section>

        <section className={styles.mainContent}>
          {
            questions.map((question, i) => {
              return <section className={styles.question} key={i} onClick={() => router.push(`/faq/search?q=${question.id}`)}>
                <section className={styles.text}>
                <h3>{question.title}</h3>
                <p>{question.content}</p>
                  </section>
                <IoChevronForwardOutline />
                </section>
            })
          }
        </section>
      </section>
    </section>
  );
}

export default Category;
