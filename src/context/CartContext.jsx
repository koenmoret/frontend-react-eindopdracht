// eslint-disable-next-line no-unused-vars
import React, {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext({});

// eslint-disable-next-line react/prop-types
function CartContextProvider({children}) {

    const [products, setProducts] = useState(() => {
        // Load products from cookie or use default values if not found
        const storedProducts = Cookies.get("products");
        return storedProducts ? JSON.parse(storedProducts) : {
            productKwaliteit: false,
            productArbo: false,
            cartItems: 0,
            purchasedProductKwaliteit: false,
            purchasedProductArbo: false
        };
    });

    function setCart(product, status, value) {
        console.log(products.cartItems);
        if(product === "beide"){
        setProducts(prevProducts => ({
            ...prevProducts,
            ["purchasedProductKwaliteit"]: status,
            ["purchasedProductArbo"]: status,
            ["cartItems"]: 0 // Stel de bijgewerkte waarde van cartItems in
        }));
        }else {
            setProducts(prevProducts => ({
                ...prevProducts,
                [product]: status,
                ["cartItems"]: products.cartItems + value // Stel de bijgewerkte waarde van cartItems in
            }));
        }
        console.log(products.cartItems);
    }

    function setPurchased(product, status, value) {
        setProducts(prevProducts => {
            const updatedCartItems = prevProducts.cartItems + value;
            return {
                ...prevProducts,
                [product]: status,
                cartItems: updatedCartItems
            };
        });
    }

    const contextData = {
        getProductKwaliteit: products.productKwaliteit,
        getProductArbo: products.productArbo,
        getCartItems: products.cartItems,
        getPurchasedProductKwaliteit: products.purchasedProductKwaliteit,
        getPurchasedProductArbo: products.purchasedProductArbo,
        setCart,
        setPurchased
    };

    // Save products to cookie whenever products state changes
    useEffect(() => {
        console.log("useeffect: "+products.cartItems);
        Cookies.set("products", JSON.stringify(products), { expires: 365 });
    }, [products]);

    return (
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    );
}
export default CartContextProvider;