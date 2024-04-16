import './Nav-bar.css';
import {FaShoppingCart} from "react-icons/fa";
import {NavLink} from "react-router-dom";


// eslint-disable-next-line react/prop-types
function NavBar({setClass}) {

    return (
        <>
            <div className="header--nav">
                <nav className={`${setClass}`}>
                    <ul>
                        <li><NavLink to="/" className={({isActive}) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Home</NavLink></li>
                        <li><NavLink to="/products" className={({isActive}) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Producten</NavLink></li>
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