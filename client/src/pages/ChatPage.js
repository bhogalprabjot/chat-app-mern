import React, { useEffect, useState } from 'react';
import { ChatState } from "../context/ChatProvider";
import OptionsDrawer from '../components/chat/OptionsDrawer';
import ChatList from '../components/chat/ChatList';
import ChatBox from '../components/chat/ChatBox';
import "./ChatPage.css";
import { MdMenu } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import GroupModal from '../components/chat/GroupModal';


const ChatPage = () => {
  // 4. Read that value within any component by using the context consumer.
  const { user, setUser, selectedChat } = ChatState();
  const history = useHistory();


  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [optionsClass, setOptionsClass] = useState("optionsDrawer__container--close");
  const [searchResult, setSearchResult] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const closeGroupModal = () => setShowGroupModal(false);
  const openGroupModal = () => {
    setShowGroupModal(true);
    setOptionsClass("optionsDrawer__container--close");
  }

  const openDrawer = () => {
    setOptionsClass("optionsDrawer__container--open")
  }
  const closeDrawer = () => {
    setOptionsClass("optionsDrawer__container--close");
  }

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   console.log("ChatPage", userInfo);
  //   if (!userInfo) {
  //     history.push("/");
  //   }
  // }, [history])

  const handleSearch = async (event) => {

    if (event.key !== 'Enter')
      return;

    console.log("Search", search);

    if (!search) {
      toast.error("Please Enter something in search", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return;
    }

    try {
      setLoading(true);
      // console.log(user.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/user?search=${search}`, config);
      setLoading(false);
      console.log(data);

      setSearchResult(data);

    } catch (error) {
      toast.error("Failed to search", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    //to remove the search results from the screen 
    if (search !== "") {
      if (e.target.value === "")
        setSearchResult(null);
    }
    // handleSearch();
    // console.log("this is search", search);
  }

  return (

    <div className='chatPage__layout--container'>
      <ToastContainer />
      {
        showGroupModal &&
        <GroupModal
          closeGroupModal={closeGroupModal}
          setShowGroupModal={setShowGroupModal}
          isUpdateModal={false}
        />
      }

      <div className={selectedChat ? 'chatPage__left--hidden' : 'chatPage__left--container'}>



        {/* fixed top bar with hamburger icon and search box */}
        <div className='chatPage__nav--container'>
          {/* <OptionsDrawer /> */}
          <OptionsDrawer optionsClass={optionsClass} closeDrawer={closeDrawer} openGroupModal={openGroupModal} />
          <MdMenu className='chatPage__nav--hamburger' onClick={openDrawer} />
          <input
            type='text'
            id='searchBox'
            className='chatPage__nav--searchBox'
            placeholder='Search User'
            value={search}
            onChange={handleChange}
            onKeyDown={handleSearch}
          />
          {/* <button className='chatPage__nav--searchBox-button' onClick={handleSearch}>Go</button> */}
        </div>




        {/* Chat List component */}
        <ChatList loading={loading} setLoading={setLoading} searchResult={searchResult} setSearchResult={setSearchResult} fetchAgain={fetchAgain} />

      </div>

      <div className={!selectedChat ? 'chatPage__right--hidden' : 'chatPage__right--container'}>
        {/* ChatBox component */}
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>

    </div>
  )
}

export default ChatPage;