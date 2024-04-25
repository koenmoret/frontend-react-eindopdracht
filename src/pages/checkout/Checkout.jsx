import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/global/Header.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

import kwaliteit from "../../assets/images/kwaliteit.png";
import arbo from "../../assets/images/arbo.png";
import "./Checkout.css";

// eslint-disable-next-line react/prop-types
function Checkout() {

    const {
        getProductKwaliteit,
        getProductArbo,
        getCartItems,
        setCart,
        setPurchased,
        getPurchasedProductKwaliteit,
        getPurchasedProductArbo
    } = useContext(CartContext);
    const {isAuth} = useContext(AuthContext);
    const [errors, setErrors] = useState({
        products: true
    });
    const navigate = useNavigate();

    function handlePayment() {
        if (getCartItems > 0) {
            console.log(getProductKwaliteit + " "+getProductArbo);
            if (getProductKwaliteit) {
                setCart("purchasedProductKwaliteit", true, -1);
                //setCart("productKwaliteit",true, -1);
            }
            if (getProductArbo) {
                setCart("purchasedProductArbo", true, -1);
                //setCart("productArbo",true, -1);
            }
            if (!isAuth) {
                //navigate('/login');
            } else {
                //navigate('/');
            }
        } else {
            setErrors({products: false});
        }
    }

    return (
        <>
            <Header setClass="global checkout"/>
            <main className="outer-container">
                <section className="inner-container checkout_products">
                    <div className="block">
                        <h3>Winkelmand</h3>
                        {getCartItems === 0 && <p>Geen producten in winkelmand.</p>}
                        {getProductKwaliteit && (
                            <>
                                <article>
                                    {!getPurchasedProductKwaliteit ? <div className="cancel"
                                                                          onClick={() => setCart("productKwaliteit", false, -1)}>X
                                    </div> : <p>Reeds aangekocht</p>}
                                    <img src={kwaliteit} alt="image of a person in a factory"/>
                                    <div className="block">
                                        <h4>Basistraining Kwaliteit</h4>
                                        <p>25,-</p>
                                    </div>
                                </article>
                            </>
                        )}
                        {getProductArbo && (
                            <>
                                <article>
                                    {!getPurchasedProductArbo ?
                                        <div className="cancel" onClick={() => setCart("productArbo", false, -1)}>X
                                        </div> : <p>Reeds aangekocht</p>}
                                    <img src={arbo} alt="image of a person in a factory"/>
                                    <div className="block">
                                        <h4>Basistraining Arbo</h4>
                                        <p>25,-</p>
                                    </div>
                                </article>
                            </>
                        )}
                    </div>
                    <div className="block">
                        <h3>Overzicht</h3>
                        <article className="amount">
                            <div>Producten({getCartItems})</div>
                            <div>
                                {getCartItems === 2 && <><p>€25,00</p><p>€25,00</p><p>Totaal €50,00</p></>}
                                {getCartItems === 1 && 'Totaal €25,00'}
                            </div>
                            <button className="btn btn-primary" onClick={handlePayment}>
                                Afrekenen
                            </button>
                            {!errors.products && <span className="text-danger">Geen producten in winkelmand</span>}
                        </article>
                    </div>

                </section>
            </main>
        </>
    );
}

export default Checkout;