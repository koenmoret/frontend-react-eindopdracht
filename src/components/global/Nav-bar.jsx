import './Nav-bar.css';
import {FaShoppingCart} from "react-icons/fa";
import {NavLink} from "react-router-dom";

import { AuthContext } from '../../context/AuthContext.jsx';
import {useContext} from "react";



// eslint-disable-next-line react/prop-types
function NavBar({setClass}) {

    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <div className="header--nav">
                <nav className={`${setClass}`}>
                    <ul>
                        <li><NavLink to="/"
                                     className={({isActive}) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Home</NavLink>
                        </li>
                        <li><NavLink to="/products"
                                     className={({isActive}) => isActive ? 'nav-item active-link' : 'nav-item default-link'}>Producten</NavLink>
                        </li>
                        {isAuth && <><li><span className="nav-item">Dashboard</span></li>
                            <li><span className="nav-item">Nieuws</span></li>
                        </>}
                        {isAuth ? <li><span className="nav-item">Logout</span></li> :
                            <li><span className="nav-item">Login</span></li>}
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