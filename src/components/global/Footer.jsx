
// eslint-disable-next-line react/prop-types
import NavBar from "./Nav-bar.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Header = ({setClass}) => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className={`${setClass} outer-container header--background ${isMenuOpen && "open"}`}>
            <div className={`header--background__overlay`}></div>
            <section className="inner-container">
                <NavBar setClass={setClass} setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}/>
                {setClass === 'home' && <div className="header--title"><h1>KAM Online</h1><h2>Kwaliteit, Arbo en Milieu</h2></div>}
            </section>
        </header>
);
}

export default Header;