import './Nav-bar.css';
import {FaShoppingCart} from "react-icons/fa";


// eslint-disable-next-line react/prop-types
function NavBar({setClass}) {

    return (
        <>
            <div className="header--nav">
                <nav className={`${setClass}`}>
                    <ul>
                        <li>Home</li>
                        <li>Producten</li>
                        <li>Nieuws</li>
                        <li>Login</li>
                        <li>
                            <span className="fa-shopping-cart">
                               <FaShoppingCart/>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;