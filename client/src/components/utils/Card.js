import "./Card.css";
import { BsPersonDashFill } from "react-icons/bs";
import { ChatState } from '../../context/ChatProvider';

const Card = (props) => {

    const {
        id,
        title,
        subTitle,
        profilePicture,
        chat,
        clickController,
        userObj,
        isSelected,
        componentName,
        actionController
    } = props;

    const { user } = ChatState();


    const prepareSubtitle = () => {
        const { isGroupChat, latestMessage } = chat;
        let subTitle = '';
        if (latestMessage) {
            if (latestMessage?.sender?._id === user?._id)
                subTitle = `You: ${latestMessage?.content}`;
            else if (isGroupChat)
                subTitle = `${latestMessage?.sender?.name}: ${latestMessage?.content}`;
            else
                subTitle = `${latestMessage?.content}`;
        }

        return subTitle;
    }

    // const containerClass = selectedChat === obj ? "card__container--selected" : "card__container";
    const containerClass = isSelected ? "card__container--selected" : "card__container";
    return (
        <div className={containerClass} onClick={clickController}>
            <img className="card__profilePicture" src={profilePicture} />
            <div className="card__details">
                <div className="card__title">
                    {title}
                </div>
                <div className="card__subtitle">
                    {chat ? prepareSubtitle() : subTitle && subTitle}
                </div>
            </div>
            {
                componentName && componentName === "DetailsDrawer" && id !== user._id ?

                    <BsPersonDashFill
                        className="card__actions--add"
                        onClick={() => actionController(userObj)}
                    />

                    :
                    <></>
            }
        </div>
    )
}

export default Card