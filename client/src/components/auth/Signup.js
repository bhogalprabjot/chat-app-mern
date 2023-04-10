import React, { useState } from 'react';
import './Signup.css';
import { MdClose } from 'react-icons/md';
import CustomModal from "../modal/CustomModal";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {

  const { closeSignUpModal } = props;
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const uploadProfilePicture = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast.warn('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Please upload an Image!");
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app-mern");
      data.append("cloud_name", "bhogalprabjot");
      fetch("https://api.cloudinary.com/v1_1/bhogalprabjot/image/upload", {
        method: 'post', body: data,
      }).then((res) => res.json()).then((data) => {
        console.log(data);
        setProfilePicture(data.url.toString());
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });

    } else {
      toast.warn('Please upload an Image!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Please upload an Image");
    }
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "newPassword":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;
      case "profilePicture":
        uploadProfilePicture(event.target.files[0]);
        break;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    console.log({
      firstName, lastName, email, password, confirmPassword, profilePicture
    });

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/user/signup",
        {
          firstName,
          lastName,
          email,
          password,
          profilePicture
        },
        config
      );

      toast.success('Registration Successful!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push("/chats");

    } catch (error) {
      toast.error('Error Occured!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setLoading(false);
    }


  };


  return (
    <CustomModal>
      <div className='signup'>
        <ToastContainer />
        <form className='signup__container' onSubmit={handleSubmit}>
          <div className='signup__title'>
            <h2>Sign Up</h2>
            <MdClose size={'2em'} cursor={'pointer'} onClick={closeSignUpModal} />
          </div>
          <div className='signup__inputs'>
            <div className='signup__inputs--name'>
              <input type='text' name='firstName' onChange={handleChange} placeholder='First Name' required />
              <input type='text' name='lastName' onChange={handleChange} placeholder='Last Name' />
            </div>
            <input type='email' name='email' onChange={handleChange} placeholder='Email Address' required />

            <div className='signup__inputs--password'>
              <input type={showPassword ? 'text' : 'password'} name='newPassword' onChange={handleChange} placeholder='New Password' required />
              <button type='button' onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <div className='signup__inputs--password'>
              <input type={showPassword ? 'text' : 'password'} name='confirmPassword' onChange={handleChange} placeholder='Confirm Password' required />
              <button type='button' onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          <div className='signup__upload'>
            <input type="file" accept='image/' id="myFile" name="profilePicture" onChange={handleChange} />
          </div>

          <button disabled={loading} className='signup__button'>Sign Up</button>

        </form>
      </div>
    </CustomModal>
  )
}

export default SignUp;