import Header from "../../components/global/Header.jsx";
import Product from "../../components/products/Product.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import productsData from "../../constants/products.json";

import "./Dashboard.css"
import kwaliteit from "../../assets/images/productKwaliteit/kwaliteit.png";
import arbo from "../../assets/images/productArbo/arbo.png";


// eslint-disable-next-line react/prop-types
function Dashboard() {

    const {user} = useContext(AuthContext);
    const {getPurchasedProductKwaliteit, getPurchasedProductArbo} = useContext(CartContext);
    const {favorites} = useContext(FavoritesContext);
    const navigate = useNavigate();
    const startElearning = (productName) => {
        const product = productsData.products.find(product => product.id === productName);
        navigate(`../elearning/${productName}`, { state: { product } });
    };

    console.log("favorites "+favorites);

    return (
        <>
            <Header setClass="global products"/>

            <main className="outer-container">

                <section className="inner-container products">
                    <section className="dashboard--header">
                        <h2>Dashboard:</h2>
                        <p>Welkom {user.username}</p>
                        <button className="btn-primary profile">Toon profiel</button>
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