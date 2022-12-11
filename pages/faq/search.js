import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Search.module.scss";

import { useRouter } from "next/router";

import { HiThumbUp, HiThumbDown } from "react-icons/hi";

import Searchbar from "../../components/Searchbar";

import questions from "../../public/data/questions.json";

function Search() {
  const router = useRouter();

  // search represents the value of user's search
  const [search, setSearch] = useState(null);

  const [question, setQuestion] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [relatedQuestions, setRelatedQuestions] = useState(null);

  const findQuestion = () => {
    if(!search) {
      return;
    }

    questions.forEach((_category, i) => {
      _category.questions.forEach(_question => {
        if(_question.id === parseInt(search)) {
          setQuestion(_question);
          setCategory(_category.category);
          setCategoryIndex(i);

          setRelatedQuestions(_category.questions.filter(q => q.id !== parseInt(search)));
        }
      });
    });
  }

  useEffect(() => {
    findQuestion();
  }, [search]);

  // Scroll to the top at the first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSearch(router.query.q);
  }, [router.query]);

  if(!question || !category || !relatedQuestions || categoryIndex === null) {
    return null;
  }

  return (
    <section className={styles.search}>
      <Head>
        <title>{question.title} | Polyminds</title>
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
          <Link href="/faq">FAQ</Link>
          <span>{`>`}</span>
          <Link href={`/faq/category?c=${categoryIndex}`}>{category}</Link>
          <span>{`>`}</span>
          <Link href={`/faq/search?q=${search}`} style={{ opacity: 1 }}>
            {question.title}
          </Link>
        </section>

        <section className={styles.mainContent}>
          <h1>{question.title}</h1>
          <span>3 months ago</span>
          <p>
          {question.content}
          </p>
        </section>

        <section className={styles.bottom}>
          <section className={styles.vote}>
            <p>Was this article helpful to you?</p>
            <HiThumbUp />
            <HiThumbDown />
          </section>
          <span>Associated articles</span>
          <ul>
            {
              relatedQuestions.map((relatedQuestion, i) => {
                return <li key={i}>
                <Link href={`/faq/search?q=${relatedQuestion.id}`}>{relatedQuestion.title}</Link>
              </li>
              })
            }
          </ul>
        </section>
      </section>
    </section>
  );
}

export default Search;
