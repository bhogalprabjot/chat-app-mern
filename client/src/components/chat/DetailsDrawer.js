import Card from "../utils/Card";
import "./DetailsDrawer.css";
import { IoCloseSharp, IoCheckmark } from "react-icons/io5";
import { BsPersonPlusFill } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

import { AiOutlineEdit } from "react-icons/ai";

import { useEffect, useState } from "react";
import GroupModal from "./GroupModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import Loader from "../utils/Loader";


const DetailsDrawer = (props) => {
    const { user, chatDetails, selectedChat, showDrawer, setShowDrawer, fetchAgain, setFetchAgain, fetchAllMessages } = props;

    const [groupNameEditable, setGroupNameEditable] = useState(false);
    const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);

    const [groupName, setGroupName] = useState(null);

    const drawerToggleClass = showDrawer ? "detailsDrawer--open" : "detailsDrawer--close";
    const { setSelectedChat } = ChatState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setGroupName(selectedChat.chatName)
    }, [selectedChat])



    const changeGroupName = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
            const payload = {
                chatId: selectedChat._id,
                chatName: groupName,
            }
            const { data } = await axios.put(`/chat/group`, payload, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            toast.success('Group name updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error);
            toast.error('Error in Search', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setGroupNameEditable(false)
    }


    const removeUserFromGroup = async (userObj) => {
        // console.log("REMOVE", userObj);
        if (selectedChat.groupAdmin._id !== user._id && userObj._id !== user._id) {
            toast.error('Only admins can remove a user!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
            const payload = {
                chatId: selectedChat._id,
                userId: userObj._id,
            }
            // console.log(payload);

            const { data } = await axios.put(`/chat/group/remove`, payload, config);

            userObj._id === user._id ? setSelectedChat() : setSelectedChat(data);


            setFetchAgain(!fetchAgain);
            fetchAllMessages();
            setLoading(false);

        } catch (error) {
            console.log(error);
            toast.error('Error in Creating chat', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    return (
        <div className={`detailsDrawer ${drawerToggleClass}`}>
            <ToastContainer />

            {
                openUpdateGroupModal &&
                <GroupModal
                    closeGroupModal={() => setOpenUpdateGroupModal(false)}
                    setShowGroupModal={() => setOpenUpdateGroupModal(true)}
                    isUpdateModal={true}
                    // selectedChat={selectedChat}
                    // setSelectedChat={setSelectedChat}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
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
                                            <input
                                                type="text"
                                                placeholder="Update Group name"
                                                value={groupName}
                                                onChange={(e) => { setGroupName(e.target.value) }}
                                            />
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
                        <BsPersonPlusFill
                            className="detailsDrawer__groupDetails-add"
                            onClick={() => setOpenUpdateGroupModal(true)}
                        />
                    </div>

                    {
                        loading ?
                            <div className="detailsDrawer__loader">
                                <Loader />
                            </div> :
                            <div className="detailsDrawer__groupDetails-list">
                                {
                                    selectedChat.users?.map((user) => {
                                        return (

                                            <Card
                                                key={user._id}
                                                id={user._id}
                                                isUserCard={true}
                                                title={user.name}
                                                subTitle={user.email}
                                                profilePicture={user.profilePicture}
                                                userObj={user}
                                                componentName={"DetailsDrawer"}
                                                actionController={removeUserFromGroup}
                                            />

                                        )
                                    })
                                }
                            </div>

                    }
                    <div className="detailsDrawer__groupDetails-leave">
                        <button onClick={() => removeUserFromGroup(user)}>{"Leave Group"}</button>
                    </div>

                </div>
            }
        </div>
    )
}

export default DetailsDrawer