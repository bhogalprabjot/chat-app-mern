import "./Card.css";
import { ChatState } from '../../context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Card = (props) => {

    const { isUserCard, title, subtitle, profilePicture, setChatLoading, key, id, obj, setSearchResult } = props;
    const { user, setUser, selectedChat, setSelectedChat, chats, setChats } = ChatState();


    const accessChat = async (userId) => {
        try {
            setChatLoading(true);
            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //         Authorization: `Bearer ${user.token}`,
            //     },
            // }
            // const { data } = await axios.post('/chat', { userId }, config);
            // if (!chats.find((chat) => chat._id === data._id))
            //     setChats([data, ...chats]);
            // setSelectedChat(data);
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

    const clickController = () => {
        if (isUserCard) {
            console.log(id);
            accessChat(id);
        } else {
            selectChat(obj);
        }
    }

    const containerClass = selectedChat === obj ? "card__container--selected" : "card__container";

    return (
        <div className={containerClass} onClick={clickController}>
            <img className="card__profilePicture" src={profilePicture} />
            <div className="card__details">
                <div className="card__name">
                    {title}
                </div>
                <div className="card__email">
                    {subtitle}
                </div>
            </div>
        </div>
    )
}

export default Card