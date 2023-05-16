import "./Card.css";

const Card = (props) => {

    const { title, subtitle, profilePicture, clickController, obj, isSelected } = props;




    // const containerClass = selectedChat === obj ? "card__container--selected" : "card__container";
    const containerClass = isSelected ? "card__container--selected" : "card__container";
    return (
        <div className={containerClass} onClick={clickController}>
            <img className="card__profilePicture" src={profilePicture} />
            <div className="card__details">
                <div className="card__title">
                    {title}
                </div>
                <div className="card__subtitle">
                    {subtitle}
                </div>
            </div>
        </div>
    )
}

export default Card