import React, { useState } from 'react';
import { ChatState } from "../context/ChatProvider";

const Chat = () => {
  // 4. Read that value within any component by using the context consumer.
  const { user } = ChatState();

  const [chats, seChats] = useState([]);


  return (
    <div>
      chats


    </div>
  )
}

export default Chat;