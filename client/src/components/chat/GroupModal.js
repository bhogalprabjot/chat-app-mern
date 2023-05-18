import "./GroupModal.css";
import CustomModal from "../modal/CustomModal";
import { MdClose } from 'react-icons/md';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import Card from '../utils/Card';
import UserBadge from "./UserBadge";


const GroupModal = (props) => {
    const { closeGroupModal, setShowGroupModal, isUpdateModal, selectedChat } = props;

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();


    const handleSearch = async (event) => {
        const keyword = event.target.value;
        setSearch(keyword);

        if (!keyword) {
            setSearchResult([]);
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
            const { data } = await axios.get(`/user?search=${keyword}`, config);
            setLoading(false);
            setSearchResult(data);
            console.log(search);
            console.log(searchResult);
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

    };

    const createGroupChat = async () => {

        if (!groupChatName || !selectedUsers) {
            toast.warn('Please fill all the feilds', {
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
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((user) => user._id))
            }
            const { data } = await axios.post(`/chat/group`, payload, config);
            setChats([data, ...chats]);
            setShowGroupModal(false);
            toast.success('New group created!', {
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


    };

    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter((obj) => obj._id !== user._id));
    }

    const handleGroup = (user) => {
        console.log(selectedUsers);
        if (selectedUsers.includes(user)) {
            toast.warn('User already added', {
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
        setSelectedUsers([...selectedUsers, user]);
    }

    return (
        <CustomModal>
            <ToastContainer />

            <div className="groupModal">
                <div className="groupModal__container">
                    <div className="groupModal__header">
                        {isUpdateModal ?
                            <h2>Update Group</h2>
                            :
                            <h2>Create Group Chat</h2>
                        }
                        <MdClose size={'2em'} cursor={'pointer'} onClick={closeGroupModal} />
                    </div>
                    <div className="groupModal__bodyContainer">

                        {
                            isUpdateModal ?
                                <div className="groupModal__selectedUsers">
                                    {
                                        selectedChat.users.map((user) => {
                                            return (
                                                <UserBadge key={user._id} name={user.name} closeController={() => handleDelete(user)} />
                                            )

                                        })
                                    }
                                </div>
                                :
                                <input name="chatName" type="text" placeholder="Chat Name" onChange={(event) => setGroupChatName(event.target.value)} />
                        }
                        <input name="search" type="text" placeholder="Search user by name or email" onChange={handleSearch} />
                        <div className="groupModal__selectedUsers">
                            {
                                selectedUsers.map((user) => {
                                    return (
                                        <UserBadge key={user._id} name={user.name} closeController={() => handleDelete(user)} />
                                    )

                                })
                            }
                        </div>
                        <div className="groupModal__searchResult">
                            {
                                loading ?
                                    <div className="groupModal__loading ping">
                                    </div>
                                    :
                                    searchResult?.slice(0, 4).map((user) => {
                                        return (

                                            <Card
                                                key={user._id}
                                                isUserCard={true}
                                                title={user.name}
                                                subtitle={user.email}
                                                profilePicture={user.profilePicture}
                                                obj={user}
                                                clickController={() => handleGroup(user)}
                                            />

                                        )
                                    })

                            }
                        </div>
                    </div>
                    <div className="groupModal__footer">
                        <button onClick={createGroupChat}>Create Chat</button>

                    </div>
                </div>

            </div>
        </CustomModal>
    )
}

export default GroupModal