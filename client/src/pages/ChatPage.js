import React, { useState } from 'react';
import { ChatState } from "../context/ChatProvider";
import OptionsDrawer from '../components/chat/OptionsDrawer';
import ChatList from '../components/chat/ChatList';
import ChatBox from '../components/chat/ChatBox';
import "./ChatPage.css";
import { MdMenu } from "react-icons/md";


const ChatPage = () => {
  // 4. Read that value within any component by using the context consumer.
  const { user } = ChatState();

  const [chats, setChats] = useState([]);
  const [optionsClass, setOptionsClass] = useState("optionsDrawer__container--close");

  const openDrawer = () => {
    setOptionsClass("optionsDrawer__container--open")
  }
  const closeDrawer = () => {
    setOptionsClass("optionsDrawer__container--close");
  }

  return (
    <div className='chatPage__layout--container'>
      <div className='chatPage__left--container'>


        {/* fixed top bar with hamburger icon and search box */}
        <div className='chatPage__nav--container'>
          <MdMenu className='chatPage__nav--hamburger' onClick={openDrawer} />
          <input type='text' id='searchBox' className='chatPage__nav--searchBox' placeholder='Search' />
        </div>



        {/* <OptionsDrawer /> */}
        <OptionsDrawer optionsClass={optionsClass} closeDrawer={closeDrawer} />
        {/* Chat List component */}
        <ChatList />
      </div>

      <div className='chatPage__right--container'>
        {/* ChatBox component */}
        <ChatBox />
      </div>

    </div>
  )
}

export default ChatPage;