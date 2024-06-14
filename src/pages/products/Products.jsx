import { CartContext } from "../../context/CartContext.jsx";
import { useContext } from "react";
import kwaliteit from "../../assets/images/productKwaliteit/kwaliteit.png";
import arbo from "../../assets/images/productArbo/arbo.png";
import Header from "../../components/global/Header.jsx";
import Product from "../../components/products/Product.jsx";
import Footer from "../../components/global/Footer.jsx";
import "./Products.css"


// eslint-disable-next-line react/prop-types
function Products() {

    const {getProductKwaliteit, getProductArbo, setCart } = useContext(CartContext);
    const addToCart = (productName) => {
        setCart(productName, true, +1);
    };

    return (
        <>
            <Header setClass="global products" />
            <main className="outer-container">
                <section className="inner-container products">
                    <article className="products">
                        <Product
                            image={kwaliteit}
                            altText="image of a person in a factory"
                            title="Basistraining Kwaliteit"
                            text="Deze training leert je alles over basisvoorwaarden voor het produceren van veilig voedsel. Daar heeft iedereen in het bedrijf invloed op, dus ook jij."
                            btntext="Aanschaffen 25,-"
                            disabled={getProductKwaliteit && "disabled"}
                            action={() => addToCart("productKwaliteit")}
                        />
                        <Product
                            image={arbo}
                            altText="image of a person in a factory"
                            title="Basistraining Arbo"
                            text="Het is belangrijk dat je weet welke risico's je loopt op je werk en hoe je ongevallen kunt voorkomen. Daar leer je meer over in deze basistraining."
                            btntext="Aanschaffen 25,-"
                            disabled={getProductArbo && "disabled"}
                            action={() => addToCart("productArbo")}
                        />
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Products;