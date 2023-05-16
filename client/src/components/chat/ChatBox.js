import { getSender } from '../../config/ChatLogic';
import { ChatState } from '../../context/ChatProvider';
import './ChatBox.css';

import { IoArrowBackCircleSharp } from 'react-icons/io5';

const ChatBox = () => {

  const { selectedChat, user } = ChatState();

  console.log(selectedChat);

  const chatDetails = selectedChat ?
    !selectedChat?.isGroupChat ?
      getSender(user, selectedChat?.users)
      :
      {}
    :
    null;
  return (
    <div className='chatBox'>
      {
        !selectedChat ?
          <div className='chatBox__noChat'>
            <h2>Please click on a user to start chating.</h2>
          </div>
          :
          <div className='chatBox__container'>
            <div className='chatBox__header'>
              <div className='chatBox__backButton'>
                <IoArrowBackCircleSharp />
              </div>
              {/* <div className='chatBox__userIcon'> */}
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
                      `${selectedChat.users?.length} users`
                  }
                </div>
              </div>
            </div>

            <div>body</div>
            <div>User Drawer</div>

          </div>
      }

    </div>
  )
}

export default ChatBox;