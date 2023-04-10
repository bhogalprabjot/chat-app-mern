import React from 'react'
import "./Toast.css";
const Toast = () => {
  return (
    <div className='notification-toast'>
      <div className='notification-toast__header'>
        <button>
          x
        </button>
      </div>
      <div className='notification-toast__body'>
        <p className="notification-toast__title">Title</p>
        <p className="notification-toast__message">Message</p>
      </div>
    </div>
  )
}

export default Toast