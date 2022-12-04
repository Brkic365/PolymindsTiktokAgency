import { domAnimation, LazyMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LazyMotion>
    </>
  );
}

export default MyApp;
