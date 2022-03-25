import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateWrapper from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn ,getInitialData } from "./actions";
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import Page from './containers/Page';



function App() {
   
  // We doing this thing to see is User logged in or not. So we remove below router and it will add to index.js file
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
}, [auth.authenticate]);


  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<PrivateWrapper/>}>
            <Route path="/" element={ <Home />}/>
          </Route>
          <Route path="/products" element={<PrivateWrapper/>}>
            <Route path="/products"  element={ <Products/> }/>
          </Route>
          <Route path="/orders" element={<PrivateWrapper/>}>
            <Route path="/orders" element={ < Orders/> }/>
          </Route>
          <Route path="/category" element={<PrivateWrapper/>}>
            <Route path="/category" element={ < Category/> }/>
          </Route>
          <Route path="/page" element={<PrivateWrapper/>}>
            <Route path="/page" element={ < Page/> }/>
          </Route>
          <Route path="/signin" element={ <Signin />} />
          <Route path="/signup" element={ <Signup />} />
        </Routes>
    </div>
  );
}

export default App;
