import React from 'react';
import './Signup.css';
import { MdClose } from 'react-icons/md';
import CustomModal from "../modal/CustomModal"

const SignUp = (props) => {

  const { closeSignUpModal } = props;

  return (
    <CustomModal>
      <div className='signup'>
        <form className='signup__container'>
          <div className='signup__title'>
            <h2>Sign Up</h2>
            <MdClose size={'2em'} cursor={'pointer'} onClick={closeSignUpModal} />
          </div>
          <div className='signup__inputs'>
            <div className='signup__inputs--name'>
              <input type='text' title='fistName' placeholder='First Name' required/>
              <input type='text' title='lastName' placeholder='Last Name' />
            </div>
            <input type='email' title='email' placeholder='Email Address' required/>
            <input type='password' title='newPassword' placeholder='New Password' required/>
            <input type='password' title='confirmPassword' placeholder='Confirm Password'required />
          </div>
          <div className='signup__upload'>
            <input type="file" id="myFile" name="filename" />
          </div>

          <button className='signup__button'>Sign Up</button>

        </form>
      </div>
    </CustomModal>
  )
}

export default SignUp;