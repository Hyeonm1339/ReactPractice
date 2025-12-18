import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

// import ProductsProvider from './context/products.context';

import './index.css';
import App from './App';
// import productReducer from './store/reducers/products';
import configureStore from "./hooks-store/product-store";

// const rootReducer = combineReducers({
//   shop: productReducer
// });
//
// const store = createStore(rootReducer);

configureStore()

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
