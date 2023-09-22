import React, { useEffect, useState } from 'react';
import "./ChatList.css";
import Loader from '../utils/Loader';
import Card from '../utils/Card';
import { ChatState } from '../../context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { getSender } from '../../config/ChatLogic';

const ChatList = (props) => {
  const { loading, setLoading, searchResult, setSearchResult, fetchAgain } = props;
  const [chatloading, setChatLoading] = useState(true);
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // console.log("ChatList", userInfo);
    if (!userInfo) {
      history.push("/");
    }


    fetchAllChats(userInfo)


  }, [history, fetchAgain])

  const fetchAllChats = async (user) => {
    // console.log("fetchAllChats", user);
    setChatLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const userId = user._id;
      const { data } = await axios.get("/chat", config);
      console.log(data);
      if (data !== null && data.length === 0) {
        data.push("Create new chat");
      }
      setChats(data)
      setChatLoading(false)
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Chats", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setChatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post('/chat', { userId }, config);
      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setChatLoading(false);
      setSearchResult(null);


    } catch (error) {
      console.log(error);
      toast.error("Unable to access chat", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  const selectChat = (chat) => {
    setSelectedChat(chat);
  }


  return (
    <div className='chatList__container'>
      {
        loading || chatloading ?
          <div className='chatList__loader--container'>
            <Loader />
          </div>
          :
          <div>
            {
              searchResult !== null ?
                <div className='chatList__searchResult--container'>
                  {

                    searchResult.length === 0 ?
                      <div className='chatList__searchResult--noResult'>
                        <h3>No Users found</h3>
                      </div> :
                      searchResult.map((user) => {
                        const { _id, name, email, profilePicture } = user;
                        return (
                          <Card
                            key={_id}
                            title={name}
                            subtitle={email}
                            profilePicture={profilePicture}
                            clickController={() => accessChat(_id)}
                          />
                        );
                      })
                  }
                </div>
                :
                <div className='chatList__chats--container'>
                  {
                    chats[0] === "Create new chat" ?
                      <div className='chatList__chats--noResult'>
                        <h3>Create new Chat</h3>
                      </div> :
                      chats.map((chat) => {
                        const { chatName, isGroupChat, users } = chat;
                        let sender = {};
                        if (!isGroupChat) {
                          sender = getSender(user, users);
                        }
                        else {
                          sender["name"] = chatName;
                          sender["profilePicture"] = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
                        }

                        return (
                          <Card
                            key={chat._id}
                            title={sender.name}
                            profilePicture={sender.profilePicture}
                            clickController={() => selectChat(chat)}
                            isSelected={selectedChat === chat}
                          />
                        );

                      })
                  }
                </div>
            }
          </div>
      }
    </div>
  )
}

export default ChatList;