import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from './context/AuthContext.jsx';
import CartContextProvider from './context/CartContext.jsx';
import FavoriteContextProvider from './context/FavoritesContext.jsx';
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <CartContextProvider>
                  <FavoriteContextProvider>
                    <App/>
                  </FavoriteContextProvider>
                </CartContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
