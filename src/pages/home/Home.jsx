import "./Home.css"
import Header from "../../components/global/Header.jsx";
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from "react";

function Home() {

    return (
        <>
            <Header setClass="home"/>
        </>
    );
}

export default Home;