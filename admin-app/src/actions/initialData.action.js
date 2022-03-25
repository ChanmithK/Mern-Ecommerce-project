import { categoryConstants, initialDataConstants, productConstants } from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
  return async (disptach) => {
    
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      const { categories, products } = res.data;
      disptach({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories }
      });
      disptach({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: { products }
      });
    } 
    // console.log(res);
  };
};
