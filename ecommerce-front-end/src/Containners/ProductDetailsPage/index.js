import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions';
import Layout from '../../Components/Layout'
import { useParams } from "react-router-dom";

const ProductDetailsPage = (props) => {

  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(state =>state.product);

  useEffect(() => {
      const { productId } = params;
      const payload = {
          params: {
            productId 
          }
      }
      dispatch(getProductDetailsById(payload));
    console.log(params);
  },[])

  return (
    <Layout>
        <div style={{}}>{product.productDetails.name}</div>
    </Layout>
    
  )
}

export default ProductDetailsPage