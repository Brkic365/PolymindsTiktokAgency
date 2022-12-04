import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import { HiHeart, HiPaperAirplane, HiScissors } from "react-icons/hi2";

import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Polyminds</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Site Description." />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <main className={styles.main} id={"home"}>
        {/* Hero section */}
        <section className={styles.hero}>
          <section className={styles.content}>
            <h1>Grow your brand.</h1>
            <p>
              Increase your engagement through short form video content
              marketing
            </p>
            <button>Contact us</button>
          </section>
          <section className={styles.imgHolder}>
            <Image
              src={`/images/home/phone.png`}
              width={366}
              height={391}
              layout="responsive"
              objectFit="contain"
              alt="Social media"
              priority
            />
          </section>
        </section>

        {/* Who we are section */}
        <section className={styles.whoWeAre} id="about">
          <section className={styles.content}>
            <h2>Who we are</h2>
            <p>
              We are a team of experts specialized in many video editing fields
              and we are dedicated to helping you grow your influence over many
              different social media platforms.
            </p>
            <p>
              We ensure that the clips you will recieve are of high quality and
              that it will catch the viewers attention.
            </p>
          </section>

          <section className={styles.imgHolder}>
            <Image
              src={`/images/home/social_media.png`}
              width={292}
              height={265}
              layout="responsive"
              objectFit="contain"
              alt="Social media"
              priority
            />
          </section>
        </section>

        {/* Steps section */}
        <section className={styles.steps} id={"steps"}>
          <section className={styles.stepOne}>
            <div className={styles.circle}>
              <HiPaperAirplane />
            </div>
            <section className={styles.text}>
              <h2>1. Forward Content</h2>
              <p>
                Send us your edited or raw videos, which we will edit in the
                next step.
              </p>
            </section>
          </section>

          <div className={styles.line} />
          <section className={styles.stepConnector1}>
            <Image
              src={`/images/home/step_connector_1.svg`}
              width={725}
              height={101}
              layout="responsive"
              objectFit="contain"
              alt="Step connector 1"
              priority
            />
          </section>

          <section className={styles.stepTwo}>
            <div className={styles.circle}>
              <HiScissors />
            </div>
            <section className={styles.text}>
              <h2>2. Edit Content</h2>
              <p>
                Convert long or unedited videos to short-form engaging videos
                that are super popular nowadays.
              </p>
            </section>
          </section>

          <div className={styles.line} />
          <section className={styles.stepConnector2}>
            <Image
              src={`/images/home/step_connector_2.svg`}
              width={778}
              height={146}
              layout="responsive"
              objectFit="contain"
              alt="Step connector 2"
              priority
            />
          </section>

          <section className={styles.stepThree}>
            <div className={styles.circle}>
              <HiHeart />
            </div>
            <section className={styles.text}>
              <h2>3. Gather publicity</h2>
              <p>
                By posting quality content frequently, you will see an increase
                in your publicity in no time!
              </p>
            </section>
          </section>
        </section>

        {/* Contact section */}
        <section className={styles.contact} id={"contact"}>
          <h2>Have any questions?</h2>
          <p>
            Feel free to reach out to us in regards to any questions you have
            about our agency.
          </p>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
