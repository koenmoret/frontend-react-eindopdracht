import { toggleForm } from "../../helper/helpers.js";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext.jsx';
import { CartContext } from "../../context/CartContext.jsx";
import { useContext } from "react";

import './Nav-bar.css';

// eslint-disable-next-line react/prop-types
function NavBar({ setClass, isMenuOpen, setMenuOpen }) {
    const { isAuth, logout } = useContext(AuthContext);
    const { getCartItems } = useContext(CartContext);
    //const [menuOpen, setMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setMenuOpen(true);
    // };

    return (
        <>
            <div className="header--nav">
                <nav className={`${setClass} ${isMenuOpen && 'open'}`}>
                    <div className="menu-icon" onClick={() => toggleForm(isMenuOpen,setMenuOpen)}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={`nav-links ${isMenuOpen && 'open'}`}>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Home</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Producten</NavLink></li>
                        {isAuth && <>
                            <li><NavLink to="/news"><span className="nav-item">Nieuws</span></NavLink></li>
                            <li><NavLink to="/dashboard"><span className="nav-item">Dashboard</span></NavLink></li>
                        </>}
                        {isAuth ? <li><span className="nav-item" onClick={logout}>Logout</span></li> :
                            <li><NavLink to="/login"><span className="nav-item">Login</span></NavLink></li>}
                        <li><NavLink to="/checkout">
                            <span className="fa-shopping-cart">
                                <FaShoppingCart />
                                {getCartItems > 0 &&
                                    <span className="cart-counter">{getCartItems}</span>}
                            </span></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;
