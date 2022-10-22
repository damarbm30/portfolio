import { useState } from "react";
import { useForm } from "react-hook-form";

import "./Contact.scss";
import { images } from "../../constants";
import { Wrapper, MotionWrap } from "../../components";
import { client } from "../../services/client";

const Footer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { name, email, message } = data;

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then((data) => {
      setIsLoading(false);
      setIsSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:damarbm30@gmail.com" className="p-text">
            damarbm30@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+62822 4389 4470" className="p-text">
            +62 822 4389 4470
          </a>
        </div>
      </div>
      {!isSubmitted ? (
        <form className="app__footer-form app__flex" onSubmit={handleSubmit(onSubmit)}>
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="name"
              placeholder="Your name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              name="email"
              placeholder="Your email"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              name="message"
              placeholder="Your Message"
              {...register("message", { required: true })}
            />
          </div>
          <button type="submit" className="p-text" onClick={handleSubmit}>
            {isLoading ? "Sending" : "Send Message"}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default Wrapper(MotionWrap(Footer, "app__footer"), "contact", "app__primarybg");
