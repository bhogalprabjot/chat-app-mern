import { createPortal } from 'react-dom';

/**
 This is a custom modal, you wrap any component with CustomModal 
 and this CustomModal will help you to render that component in "modal" 
 element in index.html instead of the standard "root" element.
 */

const CustomModal = ({children}) => {

    return createPortal(
        <>
        {children}
        </>,
        // document.getElementById("modal")
        document.body
    );
};

export default CustomModal