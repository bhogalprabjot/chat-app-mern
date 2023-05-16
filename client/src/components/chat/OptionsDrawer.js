import React, { useState } from 'react';
import "./OptionsDrawer.css";
import { ChatState } from "../../context/ChatProvider";
import { useHistory } from 'react-router-dom';


const OptionsDrawer = (props) => {

  const { user } = ChatState();
  const { optionsClass, closeDrawer,openGroupModal } = props;
  const history = useHistory();

  // console.log(user);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }



  return (
    <div className={`optionsDrawer__container ${optionsClass}`}>

      {/* top section  with profile image and cross*/}
      <div className='optionsDrawer__profile--container'>
        <button className="closebtn" onClick={closeDrawer}>&times;</button>

        <img className='optionsDrawer__profile--image' src={user?.profilePicture} />
        <div className='optionsDrawer__profile--details'>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* options */}
      <div className='optionsDrawer__options--list'>
        <div className='optionsDrawer__options--item' onClick={openGroupModal}>
          <span>New Group</span>
        </div>
        {/* <div className='optionsDrawer__options--item'>
          <span>Saved Messages</span>
        </div>
        <div className='optionsDrawer__options--item'>
          <span>Night Mode</span>
        </div> */}
        <div className='optionsDrawer__options--item' onClick={logoutHandler}> 
          <span>Logout</span>
        </div>
      </div>



    </div>
  )
}

export default OptionsDrawer;