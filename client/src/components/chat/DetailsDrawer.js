import "./DetailsDrawer.css";
import { IoCloseSharp } from "react-icons/io5";
const DetailsDrawer = (props) => {
    const { user, chatDetails, selectedChat, showDrawer, setShowDrawer } = props;

    const drawerToggleClass = showDrawer ? "detailsDrawer--open" : "detailsDrawer--close";

    return (
        <div className={`detailsDrawer ${drawerToggleClass}`}>
            <div className="detailsDrawer__header">
                <IoCloseSharp className="closebtn" onClick={() => { setShowDrawer(false) }}/>
            </div>
            <div className="detailsDrawer__info">
                <img className='detailsDrawer__userIcon'
                    src={
                        !selectedChat?.isGroupChat ?
                            chatDetails?.profilePicture
                            :
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                />
                <div className='detialsDrawer__details'>
                    <div className='detialsDrawer__username'>
                        {
                            !selectedChat?.isGroupChat ?
                                chatDetails.name
                                :
                                selectedChat.chatName
                        }
                    </div>
                    <div className='detialsDrawer__email-totalUsers'>
                        {
                            !selectedChat?.isGroupChat ?
                                chatDetails?.email
                                :
                                `${selectedChat.users?.length} Members`
                        }
                    </div>
                </div>
            </div>
            <div> group management section</div>
        </div>
    )
}

export default DetailsDrawer