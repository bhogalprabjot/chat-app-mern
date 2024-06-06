import React, { useState } from 'react';
import "./Login.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ChatState } from '../../context/ChatProvider';

const Login = (props) => {
    const showModal = () => props.setShowSignUpModal(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {setUser} = ChatState();

    const handleChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        setLoading(true);

        // Prevent the browser from reloading the page
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/signin`,
                {
                    email,
                    password,
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
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            history.push("/chats");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
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

    }
    const getGuestCredentials = () => {
        setEmail("guest@example.com");
        setPassword("guest1234");
    }

    return (
        <div className='login'>
            <ToastContainer />
            <div className='login__container'>
                <div className='login__title--container'>
                    <h1>Connect</h1>
                    <p>Helps you connect with the people in your life.</p>
                </div>
                <div className='login__form--container'>
                    <div className='login__form--card'>
                        <form className='login__form' onSubmit={handleSubmit}>
                            <input type='email' name='email' placeholder='Email address' value={email} onChange={handleChange} required />
                            <div className='login__inputs--password'>
                                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' onChange={handleChange} value={password} required />
                                <div className='login__inputs--showPassword'  onClick={toggleShowPassword}>{showPassword ?
                                    <AiFillEyeInvisible /> : <AiFillEye />
                                }</div>
                            </div>
                            <button>Log in</button>
                            <button type='button' onClick={getGuestCredentials}>Guest Login</button>

                        </form>
                        <a href=''>Forgoten password?</a>
                        <button onClick={showModal}>Create a new account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;