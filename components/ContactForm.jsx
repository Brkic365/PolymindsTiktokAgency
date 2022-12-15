import React, { useState } from "react";
import styles from "../styles/ContactForm.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

import { Fade } from "react-awesome-reveal";

export default function ContactForm() {
  const router = useRouter();

  const [success, setSuccess] = useState(false);

  // Initial status state
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  // All inputs used in the form
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Reset the data and set submitted to true after submitting
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: "",
        message: "",
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };

  // Update values on change of any input
  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }, 
    });
  };

  // Handle submitting
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: "POST",
      url: "https://formspree.io/f/moqzaqvl",
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          "Thank you, your message has been submitted."
        );

        setSuccess(true);
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null },
        });
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  const ContactForm = (
    <Fade cascade triggerOnce delay={100}>
      <p>
        Feel free to reach out to us in regards to any questions you have
        about our agency.
      </p>
      <form onSubmit={handleOnSubmit}>

        {/* Hidden input used to change the subject of the email */}
        <input
          type="hidden"
          name="_subject"
          value="New message from portfolio website"
        />
        <div className={styles.group}>
          <div className={styles.one}>
            <input
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={handleOnChange}
              required
              value={inputs.name}
            />
          </div>
          <div className={styles.two}>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              name="_replyto"
              onChange={handleOnChange}
              required
              value={inputs.email}
            />
          </div>
        </div>

        <textarea
          id="message"
          name="message"
          placeholder="Enter your message..."
          onChange={handleOnChange}
          required
          value={inputs.message}
          rows="10"
        />

        {/* Text of button changes depending on the status */}
        <button type="submit" disabled={status.submitting}>
          <p>
            {!status.submitting
              ? !status.submitted
                ? "Submit!"
                : "Submitted"
              : "Submitting..."}
          </p>
        </button>
      </form>
    </Fade>


  );

  const SuccessPage = (
    <Fade cascade triggerOnce delay={100}>
      <p>Thank you for taking the time to submit your contact form. We appreciate your interest in our company and are committed to providing you with the best possible service. If you have any questions or concerns, please do not hesitate to contact us again below.</p>
      <button onClick={() => {setSuccess(false)}}>
        Submit again
      </button>
    </Fade>
  );

  return <div className={styles.contactForm}>{success ? SuccessPage : ContactForm}</div>;
}
