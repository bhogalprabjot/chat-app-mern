import { getSender } from '../../config/ChatLogic';
import { ChatState } from '../../context/ChatProvider';
import './ChatBox.css';

import { IoArrowBackSharp } from 'react-icons/io5';
import DetailsDrawer from './DetailsDrawer';
import { useState } from 'react';

const ChatBox = (props) => {
  const { fetchAgain, setFetchAgain } = props;
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [showDrawer, setShowDrawer] = useState(false);

  console.log(selectedChat);

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
                        "online"
                        :
                        `${selectedChat.users?.length} Members`
                    }
                  </div>
                </div>
              </div>
            </div>

            <div>body</div>
            <DetailsDrawer
              selectedChat={selectedChat}
              user={user}
              chatDetails={chatDetails}
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />

          </div>
      }

    </div>
  )
}

export default ChatBox;