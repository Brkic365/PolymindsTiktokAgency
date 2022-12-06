import { domAnimation, LazyMotion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <section className="hexagons">
          <section className="hexagon1">
            <Image
              src={`/images/hexagon.svg`}
              alt="Hexagon"
              width={173}
              height={193}
              layout="responsive"
              objectFit="contain"
            />
          </section>
          <section className="hexagon2">
            <Image
              src={`/images/hexagon_small.svg`}
              alt="Hexagon"
              width={149}
              height={166}
              layout="responsive"
              objectFit="contain"
            />
          </section>
          <section className="hexagon3">
            <Image
              src={`/images/hexagon.svg`}
              alt="Hexagon"
              width={223}
              height={249}
              layout="responsive"
              objectFit="contain"
            />
          </section>
          <section className="hexagon4">
            <Image
              src={`/images/hexagon_large.svg`}
              alt="Hexagon"
              width={463}
              height={516}
              layout="responsive"
              objectFit="contain"
            />
          </section>
        </section>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LazyMotion>
    </>
  );
}

export default MyApp;
