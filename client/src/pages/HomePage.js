import React, { useEffect, useState } from 'react'
import axios from "axios";
import './HomePage.css';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/Signup';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const closeSignUpModal = () => setShowSignUpModal(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");

  }, [history])


  return (
    <>
      <Login
        setShowSignUpModal={setShowSignUpModal}
      />
      {
        showSignUpModal &&
        <SignUp
          closeSignUpModal={closeSignUpModal}
        />
      }
    </>
  )
}

export default HomePage;