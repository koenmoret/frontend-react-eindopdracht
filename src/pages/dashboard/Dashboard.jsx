import Header from "../../components/global/Header.jsx";
import Product from "../../components/products/Product.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {useContext} from "react";

import "./Dashboard.css"
import kwaliteit from "../../assets/images/kwaliteit.png";
import arbo from "../../assets/images/arbo.png";
import {AuthContext} from "../../context/AuthContext.jsx";


// eslint-disable-next-line react/prop-types
function Dashboard() {

    const {user, isAuth} = useContext(AuthContext);
    const {getPurchasedProductKwaliteit, getPurchasedProductArbo} = useContext(CartContext);

    const startElearning = (productName) => {

    };

    return (
        <>
            <Header setClass="global products"/>

            <main className="outer-container">

                <section className="inner-container products">
                    <section className="dashboard--header">
                        <h2>Dashboard:</h2>
                        <p>Welkom {user.username}</p>
                    </section>
                    <section className="dashboard--body">
                        <article className="products">
                            {getPurchasedProductKwaliteit && <>
                                <Product
                                    image={kwaliteit}
                                    altText="image of a person in a factory"
                                    title="Basistraining Kwaliteit"
                                    text=""
                                    btntext="Start E-Learning"
                                    action={() => startElearning("productKwaliteit")}/>
                            </>}
                            {getPurchasedProductArbo && <>
                                <Product
                                    image={arbo}
                                    altText="image of a person in a factory"
                                    title="Basistraining Arbo"
                                    text=""
                                    btntext="Start E-Learning"
                                    action={() => startElearning("productArbo")}/>
                            </>}
                        </article>
                    </section>
                </section>
            </main>
        </>
    );
}

export default Dashboard;