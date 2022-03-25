import axios from "../helpers/axios";
import { productsConstants } from "./constants";

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      dispatch({ type: productsConstants.GET_PRODUCT_PAGE_REQUEST });
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productsConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productsConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch(error) {
      console.log(error);
    }
  };
};
