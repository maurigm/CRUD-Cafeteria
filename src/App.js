import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/Home/Home";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/ProductCreate/ProductCreate";
import ProductEdit from "./components/views/ProductEdit/ProductEdit";
import Error404 from "./components/views/Error404/Error404";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {


  //SE DEFINE LA VBLE QUE VA A ALMACENAR LA CONSULTA DE LA API
  const [products, setProducts]= useState([]);

  //SE DEFINE LA VARIABLE QUE ALMACENA LA VBLE DE ENTORNO
  const URL = process.env.REACT_APP_API_CAFETERIA;


  useEffect( () => {
    getApi();
    } , [] );

  const getApi = async () => {
    try {
      const res = await fetch(URL);
      const productsApi = await res.json();
      setProducts(productsApi);
      
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
      <div>
        <Router>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element= {<Home />} />
              <Route path="/products/table" element={<ProductsTable products = {products} />} />
              <Route path="/products/create" element={<ProductCreate/>} />
              <Route path="/products/edit" element={<ProductEdit/>} />
              <Route path="*" element={<Error404/>} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
