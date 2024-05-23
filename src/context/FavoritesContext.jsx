// eslint-disable-next-line no-unused-vars
import React, {createContext, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";

export const FavoritesContext = createContext({});

// eslint-disable-next-line react/prop-types
function FavoritesContextProvider({children}) {

    const [favorites, setFavorites] = useState([]); // State to store favorite articles
    const [cookies, setCookie] = useCookies(['favorites']); // Use cookies to store favorites

    useEffect(() => {
        // Check if there are favorites in cookies when component mounts
        if (cookies.favorites) {
            setFavorites(cookies.favorites);
        }
    }, [cookies.favorites]);// Update favorites state when cookies.favorites changes

    // const addToFavorites = (article) => {
    //     const updatedFavorites = [...favorites, article];
    //     setCookie('favorites', updatedFavorites, { path: '/', maxAge: 365 * 24 * 60 * 60  });
    //     setFavorites(updatedFavorites);
    // };
    //
    // const removeFromFavorites = (articleToRemove) => {
    //     const updatedFavorites = favorites.filter(favorite => favorite.url !== articleToRemove.url);
    //     setCookie('favorites', updatedFavorites, { path: '/' });
    //     setFavorites(updatedFavorites);
    // };
    //
    // const isFavorite = (article) => {
    //     return favorites.some(favorite => favorite.url === article.url);
    // };

    const contextData = {
        favorites,
        cookies,
        setCookie
    };

    return (
        <FavoritesContext.Provider value={contextData}>
            {children}
        </FavoritesContext.Provider>
    );
}
export default FavoritesContextProvider;