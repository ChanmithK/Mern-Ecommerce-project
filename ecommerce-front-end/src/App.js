import React from "react";
import "./App.css";
import HomePage from "./Containners/HomePage";
import ProductListPage from "./Containners/ProductListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory, isUserLoggedIn } from "./actions";
import ProductDetailsPage from "./Containners/ProductDetailsPage";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(getAllCategory());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/:productSlug/:productImgSlug/:productId/p" element={<ProductDetailsPage />} /> 
          <Route path="/:slug"  element={<ProductListPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
