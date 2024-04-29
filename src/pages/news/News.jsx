import Header from "../../components/global/Header.jsx";

import "./News.css"
import {AuthContext} from "../../context/AuthContext.jsx";



// eslint-disable-next-line react/prop-types
function News() {



    return (
        <>
            <Header setClass="global products"/>

            <main className="outer-container">

                <section className="inner-container products">

                </section>
            </main>
        </>
    );
}

export default News;