import axios from "../helpers/axios"
import { productsConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/product${slug}`);
        if(res.status === 200){
            dispatch({
                type: productsConstants.GET_PRODUCTS_BY_SLUG,
                payload:res.data
            })
        }
    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productsConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/productDetail/${productId}`);
            console.log(res);
            dispatch({
                type: productsConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productsConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}