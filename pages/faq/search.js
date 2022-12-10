import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Search.module.scss";

import { useRouter } from "next/router";

import { HiThumbUp, HiThumbDown } from "react-icons/hi"

import Searchbar from "../../components/Searchbar";

function Search() {
  const router = useRouter();

  // search represents the value of user's search
  const [search, setSearch] = useState(null);

  // Scroll to the top at the first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSearch(router.query.q);
  }, [router.query]);

  return (
    <section className={styles.search}>
      <section className={styles.top}>
        <Searchbar />
      </section>

      <section className={styles.content}>
        <section className={styles.path}>
            <Link href="/faq">
              FAQ 
            </Link>
            <span>{`>`}</span>
            <Link href="/faq/returns-and-refunds">
              Returns & refunds
            </Link>
            <span>{`>`}</span>
            <Link href="/faq/search?q=1" style={{opacity: 1}}>
            Your right to cancel and return an order
            </Link>
        </section>

        <section className={styles.mainContent}>
          <h1>Your right to cancel and return an order</h1>
          <span>3 months ago</span>
          <p>
            After successfully completing a payment, you have NO RIGHT to
            request a refund or return of your order, and you are obligated to
            receive your order.
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
            <li>
              <Link href={'/faq'}>You have NO RIGHTS for refunds</Link>
            </li>
            <li>
              <Link href={'/faq'}>You have NO RIGHTS for refunds</Link>
            </li>
            <li>
              <Link href={'/faq'}>You have NO RIGHTS for refunds</Link>
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
}

export default Search;
