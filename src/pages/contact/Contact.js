import React , { useRef } from "react";
import { FaEnvelope, FaLinkedin, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_nhlaqar', form.current, 'g00Ljk-1DLAfHn8qU')
      .then((result) => {
         toast.success("Message Send successfully")

      }, (error) => {
        toast.error(error.text)
     
      });
      e.target.reset()
  };
  return (
    <section>
      <div  className={`container ${styles.contact}`}>
        <h1>Contact Us</h1>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input type="text" name="user_name" placeholder="Full Name" />

              <label>Name</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your Active Email"
              />

              <label>Subject</label>
              <input type="text" name="subject" placeholder="Subject" />

              <textarea name="message" cols="30" row="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h2>Our Contact Information</h2>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt/>
                  <p>+234 782 132 3452</p>
                </span>

                <span>
                  <FaEnvelope/>
                  <p>Support@apnaStore.com</p>
                </span>

                <span>
                  <FaLocationArrow/>
                  <p>Noida section 63 , UP , India</p>
                </span>

                <span>
                  <FaLinkedin/>
                  <p>
                    <a href="https://www.linkedin.com/in/trishank-khatri/" target="_blank" rel="noreferrer" >Linkedin</a>
                  </p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
