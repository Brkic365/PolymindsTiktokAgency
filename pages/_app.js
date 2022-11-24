import { domAnimation, LazyMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <Navbar />
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}

export default MyApp;
