import "./Home.css"
import Header from "../../components/global/Header.jsx";
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from "react";

function Home() {

    const {user, isAuth} = useContext(AuthContext);

    return (
        <>
            <Header setClass="home"/>
            {isAuth ? <p>Welkom {user.username}</p> : <p>Welkom gebruiker</p>}
        </>
    );
}

export default Home;