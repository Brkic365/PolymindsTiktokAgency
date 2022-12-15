import React from 'react'
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/NotFound.module.scss"

function NotFound() {
  return (
    <div className={styles.container}>
    <Head>
      <title>404 | Polyminds</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Site Description." />
      <meta property="og:image" content="/images/logo.png" />
      <meta name="theme-color" content="#000000" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>

    <main className={styles.notFound}>
        <section className={styles.imgHolder}>
            <Image
              src={`/images/404.webp`}
              width={976}
              height={646}
              layout="responsive"
              objectFit="contain"
              alt="404"
              priority
            />
        </section>
        <h1>{"Something’s wrong"}</h1>
        <p>{"We can’t find the page you were looking for."}</p>
        <button>Go to the homepage</button>
    </main>
    </div>
  )
}

export default NotFound