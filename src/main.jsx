import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from './context/AuthContext.jsx';
import CartContextProvider from './context/CartContext.jsx';
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <CartContextProvider>
                <AuthContextProvider>
                    <App/>
                </AuthContextProvider>
            </CartContextProvider>
        </Router>
    </React.StrictMode>,
)
