import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import productReducer from "./product.reducer"
import orderReducer from "./order.reducer"
import categoryReducer from "./category.reducer"
import pageReducer from "./page.reducer"


const rootReducer = combineReducers({
    auth:authReducer,
    user: userReducer,
    category:categoryReducer,
    order:orderReducer,
    product: productReducer,
    page:pageReducer
});

export default rootReducer;
