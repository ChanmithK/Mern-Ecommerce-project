import { productsConstants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    //This productByPrice is object so we can't use map function to display this details in product container
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    upper20k: [],
  },
  pageRequest: false,
  page: {},
  error: null,
  productDetails:{},
  loading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case productsConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;
    case productsConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;
    case productsConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;
    case productsConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        pageRequest: false,
      };
      break;
      case productsConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productsConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };
      break;
    case productsConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
