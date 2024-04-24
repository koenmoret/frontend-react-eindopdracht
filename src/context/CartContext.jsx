// eslint-disable-next-line no-unused-vars
import React, {createContext, useState} from 'react';

export const CartContext = createContext({});

// eslint-disable-next-line react/prop-types
function CartContextProvider({children}) {

    const [products, setProducts] = useState({
        productKwaliteit: false,
        productArbo: false,
        cartItems: 0
    });

    function setCart(product) {
        console.log('Gebruiker is uitgelogd!');
        setProducts({
            ...products,
            [product]: true,
            cartItems: products.cartItems + 1,
        });
    }

    const contextData = {
        getProductKwaliteit: products.productKwaliteit,
        getProductArbo: products.productArbo,
        getCartItems: products.cartItems,
        setCart,
    };

    return (
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    );
}
export default CartContextProvider;