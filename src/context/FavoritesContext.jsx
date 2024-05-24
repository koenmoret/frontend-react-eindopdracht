import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const FavoriteContext = createContext();

const FavoriteContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [cookies, setCookie] = useCookies(['favorites']);

    useEffect(() => {
        if (cookies.favorites) {
            setFavorites(cookies.favorites);
        }
    }, [cookies.favorites]);

    const addToFavorites = (article) => {
        const updatedFavorites = [...favorites, article];
        setCookie('favorites', updatedFavorites, { path: '/', maxAge: 365 * 24 * 60 * 60 });
        setFavorites(updatedFavorites);
    };

    const removeFromFavorites = (articleToRemove) => {
        const updatedFavorites = favorites.filter(favorite => favorite.url !== articleToRemove.url);
        setCookie('favorites', updatedFavorites, { path: '/' });
        setFavorites(updatedFavorites);
    };

    const isFavorite = (article) => {
        return favorites.some(favorite => favorite.url === article.url);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteContextProvider;
