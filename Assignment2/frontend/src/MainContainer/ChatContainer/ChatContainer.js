import React from "react";
import { useState, useRef } from "react";
import { Div } from "../../Utils/Utils";
import Chatbox from "./Chatbox/Chatbox";
import "../../Styles/Utils.scss";
import "./ChatContainer.scss";
import TopBar from "./Topbar/Topbar";

const ChatContainer = (props) => {
  const { user, setLoginPage } = props;

  const [darkMode, setDarkMode] = useState(false);
  const [count,setCount] = useState(Number(sessionStorage.getItem("NumbMsgs")));

  const handleIncrement = () => {
    var numb = Number(sessionStorage.getItem("NumbMsgs"));
    numb += 1;
    setCount(numb);
    sessionStorage.setItem("NumbMsgs", numb);
  }
  const handleDecrement = () => {
    var numb = Number(sessionStorage.getItem("NumbMsgs"));
    numb -= 1;
    setCount(numb);
    sessionStorage.setItem("NumbMsgs", numb);
  }


  return (
    <div
      className={`chat-container ${darkMode ? "dark" : "light"}${
        darkMode ? " times-hidden" : ""
      }`}
    >
      <Chatbox {...{ user, count }} />
      <TopBar
        {...{
          username: user,
          setLoginPage,
          darkMode,
          setDarkMode,
        }}
      />
    </div>
  );
};

export default ChatContainer;
