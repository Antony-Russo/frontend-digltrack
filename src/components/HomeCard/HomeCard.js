import "./HomeCard.css";

const HomeCard = (props) => {
    return (
        <li className="home-card-container" style={{ backgroundColor: props.branchData.bgColor }}>
            <div className="card-icon-container">
                {props.branchData.icon && <props.branchData.icon className="card-icon" />}
                <span className="card-count">{props.branchData.count}</span>
            </div>
            <h2 className="card-status">{props.branchData.status}</h2>
        </li>
    );
};

export default HomeCard;