import { getSender, isLastMessage, isLoggedInUser, isSameSender, isSameSenderMargin } from '../../config/ChatLogic';
import { ChatState } from '../../context/ChatProvider';
import './ChatBox.css';

import { IoArrowBackSharp } from 'react-icons/io5';
import DetailsDrawer from './DetailsDrawer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../utils/Loader';
import ScrollableFeed from 'react-scrollable-feed';
import io from 'socket.io-client';
let socket, selectedChatCompare;
const SERVER_BASE_URL = "http://localhost:5000";

const ChatBox = (props) => {
  const { fetchAgain, setFetchAgain } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();


  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchAllMessages = async (e) => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/message/${selectedChat._id}`,
        config
      );

      console.log("MESSAGES", data);
      setMessages(data);
      setLoading(false);

      // console.log(socket)
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch message", {
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

  };

  const sendNewMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");

        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        console.log(data);
        socket.emit('new message', data);
        setMessages([...messages, data]);

      } catch (error) {
        console.log(error);
        toast.error("Unable to send message", {
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
  };
  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    socket = io(process.env.REACT_APP_SOCKET_BASE_URL);
    console.log('io connection', userInfo);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

  }, [])




  useEffect(() => {
    console.log("this is message recieved");

    socket.on('message recieved', (newMessageRecieved) => {
      console.log("this is message recieved", newMessageRecieved);

      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain)
        }
      }
      else {
        setMessages([...messages, newMessageRecieved]);
      }
    })
  })

  const inputHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected)
      return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  };


  const chatDetails = selectedChat ?
    !selectedChat?.isGroupChat ?
      getSender(user, selectedChat?.users)
      :
      {}
    :
    null;

  return (
    <div className={showDrawer ? 'chatBox--squeeze' : "chatBox"}>
      {
        !selectedChat ?
          <div className='chatBox__noChat'>
            <h2>Please click on a user to start chating.</h2>
          </div>
          :
          <div className='chatBox__container'>
            <div className='chatBox__header' >
              <div className='chatBox__backButton'>
                <IoArrowBackSharp onClick={() => { setSelectedChat(null) }} />
              </div>
              {/* <div className='chatBox__userIcon'> */}
              <div className="chatBox__headerInfo" onClick={() => { setShowDrawer(true) }}>
                <img className='chatBox__userIcon'
                  src={
                    !selectedChat?.isGroupChat ?
                      chatDetails?.profilePicture
                      :
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                />
                {/* </div> */}
                <div className='chatBox__details'>
                  <div className='chatBox__username'>
                    {
                      !selectedChat?.isGroupChat ?
                        chatDetails.name
                        :
                        selectedChat.chatName
                    }
                  </div>
                  <div className='chatBox__onlineStatus'>
                    {
                      !selectedChat?.isGroupChat ?
                        isTyping ? "typing..." : "online"
                        :
                        isTyping ? "typing..." : `${selectedChat.users?.length} Members`
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='chatBox__body'>
              <div className={showDrawer ? 'chatBox__chat-container--squeeze' : "chatBox__chat-container"}>
                {
                  loading ?
                    <div className='chatBox__loading'>
                      <Loader />
                    </div>
                    :
                    <ScrollableFeed>
                      {

                        messages && messages.map((msg, idx) => (
                          // <div className={isSameSenderMargin(messages, msg, idx, user._id) ? 'chatBox__message-outer-container--right' : 'chatBox__message-outer-container'}>
                          <div key={msg._id} className={(msg?.sender?._id === user._id) ? 'chatBox__message-outer-container--right' : 'chatBox__message-outer-container'}>
                            {
                              (isSameSender(messages, msg, idx, user._id) || isLastMessage(messages, idx, user._id))
                              &&
                              // (<div
                              //   title={msg.sender.name}
                              //   className='chatBox__user-logo'
                              // >
                              <img title={msg.sender.name} className='chatBox__user-logo' src={msg.sender.profilePicture} />
                              // </div>)
                            }

                            <div className={(isSameSender(messages, msg, idx, user._id) || isLastMessage(messages, idx, user._id)) ? 'chatBox__message-container' : 'chatBox__message-container--withoutLogo'}>
                              {msg.content}
                            </div>
                          </div>
                        ))
                      }
                    </ScrollableFeed>
                }
              </div>
              <div className='chatBox__chat-input'>
                <input
                  onKeyDown={sendNewMessage}
                  onChange={inputHandler}
                  value={newMessage}
                  placeholder='Write a message...'
                >
                </input>
              </div>
            </div>
            <DetailsDrawer
              selectedChat={selectedChat}
              user={user}
              chatDetails={chatDetails}
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              fetchAllMessages={fetchAllMessages}
            />

          </div>
      }

    </div >
  )
}

export default ChatBox;