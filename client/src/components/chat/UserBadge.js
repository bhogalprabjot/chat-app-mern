import { MdClose } from "react-icons/md";
import "./UserBadge.css";

const UserBadge = (props) => {

    const { name, closeController, componentName } = props;


    return (
        <div className="userBadge">
            <div className="userBadge__title">
                {name}
            </div>
            {
                !componentName &&
                <MdClose size={'1em'} cursor={'pointer'} onClick={closeController} />
            }
        </div>
    )
}

export default UserBadge