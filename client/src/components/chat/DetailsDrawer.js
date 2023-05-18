import Card from "../utils/Card";
import "./DetailsDrawer.css";
import { IoCloseSharp, IoCheckmark } from "react-icons/io5";
import { BsPersonAdd } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

import { AiOutlineEdit } from "react-icons/ai";

import { useState } from "react";
import GroupModal from "./GroupModal";



const DetailsDrawer = (props) => {
    const { user, chatDetails, selectedChat, showDrawer, setShowDrawer } = props;

    const [groupNameEditable, setGroupNameEditable] = useState(false);
    const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);

    const drawerToggleClass = showDrawer ? "detailsDrawer--open" : "detailsDrawer--close";


    const changeGroupName = async () => {
        setGroupNameEditable(false)
    }


    return (
        <div className={`detailsDrawer ${drawerToggleClass}`}>
            {
                openUpdateGroupModal &&
                <GroupModal
                    closeGroupModal={() => setOpenUpdateGroupModal(false)}
                    setShowGroupModal={() => setOpenUpdateGroupModal(true)}
                    isUpdateModal={true}
                    selectedChat={selectedChat}
                />
            }
            <div className="detailsDrawer__header">
                <IoCloseSharp className="closebtn" onClick={() => { setShowDrawer(false) }} />
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
                            selectedChat?.isGroupChat ?
                                (
                                    groupNameEditable ?
                                        <div className="detialsDrawer__edit-groupName">
                                            <input type="text" placeholder={selectedChat.chatName} />
                                            <HiXMark
                                                className="detialsDrawer__edit-buttons"
                                                onClick={() => setGroupNameEditable(false)}

                                            />
                                            <IoCheckmark
                                                className="detialsDrawer__edit-buttons"
                                                onClick={changeGroupName}

                                            />
                                        </div>
                                        :
                                        <div className="detialsDrawer__groupName">
                                            <h2>{selectedChat.chatName}</h2>
                                            <AiOutlineEdit
                                                className="detialsDrawer__groupName--edit-button"
                                                onClick={() => setGroupNameEditable(true)}
                                            />
                                        </div>
                                )
                                :
                                <h2>{chatDetails.name}</h2>



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
            {
                selectedChat.isGroupChat &&
                <div className="detailsDrawer__groupDetails">
                    <div className="detailsDrawer__groupDetails-header">
                        <h2>Members</h2>
                        <BsPersonAdd
                            className="detailsDrawer__groupDetails-add"
                            onClick={() => setOpenUpdateGroupModal(true)}
                        />
                    </div>

                    <div className="detailsDrawer__groupDetails-list">
                        {
                            selectedChat.users?.map((user) => {
                                return (

                                    <Card
                                        key={user._id}
                                        isUserCard={true}
                                        title={user.name}
                                        subtitle={user.email}
                                        profilePicture={user.profilePicture}
                                        obj={user}
                                    // clickController={() => handleGroup(user)}
                                    />

                                )
                            })
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default DetailsDrawer