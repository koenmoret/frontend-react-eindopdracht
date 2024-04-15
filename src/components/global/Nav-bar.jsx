import './Nav-bar.css';


// eslint-disable-next-line react/prop-types
function NavBar({setClass}) {

    return (
        <>
            <div className="header--nav">
                <nav className={`${setClass}`}>
                    <ul>
                        <li>test 1</li>
                        <li>test 2</li>
                        <li>test 3</li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;