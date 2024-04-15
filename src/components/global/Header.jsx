
// eslint-disable-next-line react/prop-types
import NavBar from "./Nav-bar.jsx";

// eslint-disable-next-line react/prop-types
const Header = ({setClass}) => {



    return (
        <header className={`${setClass} outer-container header--background`}>
            <section className="inner-container">
                <NavBar setClass={setClass} />
            </section>
        </header>
);
}

export default Header;