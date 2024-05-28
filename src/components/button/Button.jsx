// Style
import './button.css';

const Button = ({ type, buttonText, icon, onClick, id }) => {
    return (
        <button
            type={type}
            className='regular-button'
            onClick={id ? () => onClick(id) : onClick}
        >
            {buttonText}
            {icon}
        </button>
    );
}

export default Button;