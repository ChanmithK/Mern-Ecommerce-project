import React from "react";
import Layout from "../../Components/Layout";
import getParams from "../../utils/getParams";
import ProductStore from "./ProductStore";
import { useLocation } from "react-router-dom";
import "./style.css";
import ProductPage from "./ProductPage";

export default function ProductListPage(props) {

  const location = useLocation();
  const renderProduct = () => {
    console.log('props',props)
    const params = getParams(location.search);
    
    let content = null;
    switch(params.type){
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props} />;
        break;
        default:
          content = null;
    }
    return content;
  }
  

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
}
