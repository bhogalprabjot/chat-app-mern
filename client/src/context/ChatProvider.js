import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/*
There are four steps to using React context:

    1. Create context using the createContext method.
    2. Take your created context and wrap the context provider around your component tree.
    3. Put any value you like on your context provider using the value prop.
    4. Read that value within any component by using the context consumer.
*/

// 1. Create context using the createContext method.
const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        // console.log("ChatProvider", userInfo);
        if (!userInfo) {
            history.push("/");
        }


    }, [history]);

  
    // 3. Put any value you like on your context provider using the value prop.
    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
            {children}
        </ChatContext.Provider>
    )
};

export const ChatState = () => {

    // to make state accessible to other parts of our app we use useContext hook
    return useContext(ChatContext);
}



export default ChatProvider;