import React, { useEffect, useState } from 'react'
import axios from "axios";
import './Home.css';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/Signup';

const Home = () => {

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const closeSignUpModal = () => setShowSignUpModal(false);


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

export default Home;