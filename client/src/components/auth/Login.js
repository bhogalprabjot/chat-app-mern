import React from 'react';
import "./Login.css";


const Login = (props) => {
    const showModal = () => props.setShowSignUpModal(true);



    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__title--container'>
                    <h1>Connect</h1>
                    <p>Helps you connect with the people in your life.</p>
                </div>
                <div className='login__form--container'>
                    <div className='login__form--card'>
                        <form className='login__form'>
                            <input type='eamil' title='email' placeholder='Email address' required />
                            <input type='text' title='password' placeholder='Password' required />
                            <button onClick={()=>{}}>Log in</button>
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