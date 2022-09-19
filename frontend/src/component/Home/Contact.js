import React from "react";
import "./contact.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
const Contact = () => {
  return (
    <div className="contactMainPage">
      <div className="contactMainDiv">
        <a href="https://github.com/sumansaksh">
          <div className="contactsubDiv">
            <BsGithub />
            <p>GitHub</p>
          </div>
        </a>

        <a href="https://www.linkedin.com/in/suman-sakshi-751188218/">
          <div className="contactsubDiv">
            <BsLinkedin />
            <p>LinkedIn</p>
          </div>
        </a>

        <a href="https://sumansaksh.netlify.app/">
          <div className="contactsubDiv">
            <TbWorld />
            <p>Portfolio</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
