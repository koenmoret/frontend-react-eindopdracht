
// eslint-disable-next-line react/prop-types
import NavBar from "./Nav-bar.jsx";

// eslint-disable-next-line react/prop-types
const Header = ({setClass}) => {



    return (
        <header className={`${setClass} outer-container header--background`}>
            <div className={`header--background__overlay`}></div>
            <section className="inner-container">
                <NavBar setClass={setClass} />
                {setClass === 'home' && <div className="header--title"><h1>KAM Online</h1><h2>Kwaliteit, Arbo en Milieu</h2></div>}
            </section>
        </header>
);
}

export default Header;