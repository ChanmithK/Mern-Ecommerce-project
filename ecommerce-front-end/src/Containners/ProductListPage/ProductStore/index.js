import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { useLocation  , Link } from "react-router-dom";
import { imgURL } from "../../../urlConfig";
import './style.css';

function ProductStore(props) {

    const dispatch = useDispatch();
    const location = useLocation();
    const product = useSelector((state) => state.product);
    const[priceRange, setPriceRange]=useState({
        under5k:5000,
        under10k:10000,
        under15k:15000,
        under20k:20000,
        upper20k:50000
    });
  
    useEffect(() => {
      dispatch(getProductsBySlug(location.pathname));
    }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        //key is under5k,under10k, under15k .......
        return (
          <div className="card">
            <div className="cardHeader">
              <div>
                {location.pathname.split("/")} mobile under {priceRange[key]}
              </div>
              <button>View all</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link to={`${product.slug}/${product._id}/p`}  style={{display :'block'}}  className="productContainer">
                  <div className="productImgContainer">
                    <img src={imgURL(product.productPictures[0].img)} alt="" />
                  </div>
                  <div className="productInfo">
                    <div className="productTitle">{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3343</span>
                     </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductStore;
