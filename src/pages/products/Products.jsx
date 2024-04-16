import Header from "../../components/global/Header.jsx";
import Product from "../../components/products/Product.jsx";


import "./Products.css"
import kwaliteit from "../../assets/images/kwaliteit.png";
import arbo from "../../assets/images/arbo.png";


// eslint-disable-next-line react/prop-types
function Products() {

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
                            // disabled={cartItems.productKwaliteit !== 0 && "disabled"}
                            // product={cartItems.setProductKwaliteit}
                        />
                        <Product
                            image={arbo}
                            altText="image of a person in a factory"
                            title="Basistraining Arbo"
                            text="Het is belangrijk dat je weet welke risico's je loopt op je werk en hoe je ongevallen kunt voorkomen. Daar leer je meer over in deze basistraining."
                            // disabled={cartItems.productArbo !== 0 && "disabled"}
                            // product={cartItems.setProductArbo}
                        />
                    </article>
                </section>
            </main>
        </>
    );
}

export default Products;