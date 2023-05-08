import React from 'react';
import "./ChatList.css";
import Loader from '../utils/Loader';
import UserCard from '../utils/UserCard';


const ChatList = (props) => {
  const { loading, setLoading, searchResult } = props;

  return (
    <div className='chatList__container'>
      <div className='chatList__loader--container'>
        {
          loading ?
            <Loader />
            : <></>
        }
      </div>
      <div className='chatList__searchResult--container'>

        {
          searchResult === null ?
            <></> :
            searchResult.length === 0 ?
              <div className='chatList__searchResult--noResult'>
                <h3>No Users found</h3>
              </div> :
              searchResult.map((user) => {
                const { id, name, email, profilePicture } = user;
                return (
                  <UserCard id={id} name={name} email={email} profilePicture={profilePicture} />
                );
              })
        }
      </div>
    </div>
  )
}

export default ChatList;