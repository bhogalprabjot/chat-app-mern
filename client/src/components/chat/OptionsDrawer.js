import React, { useState } from 'react';
import "./OptionsDrawer.css";
import { ChatState } from "../../context/ChatProvider";


const OptionsDrawer = (props) => {

  const { user } = ChatState();
  const { optionsClass, closeDrawer } = props;


  console.log(user);

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
        <div className='optionsDrawer__options--item'>
          <span>New Group</span>
        </div>
        <div className='optionsDrawer__options--item'>
          <span>Saved Messages</span>
        </div>
        <div className='optionsDrawer__options--item'>
          <span>Night Mode</span>
        </div>
        <div className='optionsDrawer__options--item'>
          <span>Logout</span>
        </div>
      </div>



    </div>
  )
}

export default OptionsDrawer;