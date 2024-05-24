import Header from "../../components/global/Header.jsx";
import Product from "../../components/products/Product.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {FavoriteContext} from "../../context/FavoritesContext.jsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import productsData from "../../constants/products.json";

import "./Dashboard.css"
import kwaliteit from "../../assets/images/productKwaliteit/kwaliteit.png";
import arbo from "../../assets/images/productArbo/arbo.png";


// eslint-disable-next-line react/prop-types
function Dashboard() {

    const {user} = useContext(AuthContext);
    const { favorites, removeFromFavorites } = useContext(FavoriteContext);
    const {getPurchasedProductKwaliteit, getPurchasedProductArbo} = useContext(CartContext);
    const navigate = useNavigate();
    const startElearning = (productName) => {
        const product = productsData.products.find(product => product.id === productName);
        navigate(`../elearning/${productName}`, { state: { product } });
    };

    const showProfile = () => {
        navigate('/profile'); // Adjust the path as necessary
    };

    const handleRemoveFavorite = (article) => {
        removeFromFavorites(article);
    };

    return (
        <>
            <Header setClass="global products"/>

            <main className="outer-container">

                <section className="inner-container products">
                    <section className="dashboard--header">
                        <h2>Dashboard:</h2>
                        <p>Welkom {user.username}</p>
                        <button className="btn-primary profile" onClick={showProfile}>Toon profiel</button>
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
                    <section className="dashboard--favorites">
                        <h3>Favoriete artikelen</h3>
                        <ul>
                            {favorites.map((article, index) => (
                                <li key={index}>
                                    <h4>{article.title}</h4>
                                    <p>{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">Lees meer</a>
                                    <span className="btn-favorite" onClick={() => handleRemoveFavorite(article)}>Verwijder</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </main>
        </>
    );
}

export default Dashboard;