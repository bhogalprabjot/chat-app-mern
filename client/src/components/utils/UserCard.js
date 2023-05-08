import "./UserCard.css";

const UserCard = (props) => {

    const { id, name, email, profilePicture } = props;

    return (
        <div className="userCard__container">
            {/* <div className="userCard__profilePicture"> */}
            <img className="userCard__profilePicture" src={profilePicture} />
            {/* </div> */}
            <div className="userCard__details">
                <div className="userCard__name">
                    {name}
                </div>
                <div className="userCard__email">
                    {email}
                </div>
            </div>
        </div>
    )
}

export default UserCard