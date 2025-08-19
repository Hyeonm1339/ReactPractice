import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import cartSlice from "./store/cart-slice";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-actions";

let isInitial = true;

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        // const sendCartData = async () => {
            // dispatch(uiActions.showNotification({
            //     status: 'pending',
            //     title: 'Sending...',
            //     message: 'Sending cart data!'
            // }))
            // const response = await fetch('https://reactpractice-cf0b7-default-rtdb.firebaseio.com/cart.json', {
            //     method: 'PUT',
            //     body: JSON.stringify(cart),
            // })
            //
            // if (!response.ok) {
            //     throw new Error('Sending cart data failed.');
            // }

            // const responseData = await response.json();

            // dispatch(uiActions.showNotification({
            //     status: 'success',
            //     title: 'Success!',
            //     message: 'Sent cart data successfully!'
            // }))
        // }
        if (isInitial) {
            isInitial = false;
            return;
        }
        if(cart.change){
            dispatch(sendCartData(cart))
        }
        // sendCartData().catch(error => {
        //     dispatch(uiActions.showNotification({
        //         status: 'error',
        //         title: 'Error!',
        //         message: 'Sent cart data failed!'
        //     }))
        // })

    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification &&
                <Notification status={notification.status} message={notification.message} title={notification.title}/>}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
