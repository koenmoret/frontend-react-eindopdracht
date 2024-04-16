import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";

import "./components/global/Global.css";

function App() {


  return (
    <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<Products />}/>
        </Routes>
    </>
  )
}

export default App
