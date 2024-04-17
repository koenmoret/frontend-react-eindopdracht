import {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import { AuthContext } from './context/AuthContext.jsx';

import "./components/global/Global.css";


function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>

            </Routes>
        </>
    )
}

export default App
