import { Fragment, useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../checkout-Item/checkout-item'

import './checkout.scss';

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext);

    return(
        <Fragment>
            <div className='checkout-container'>
                <div className='column-titles'>
                    <div>Product</div>
                    <div>Description</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Remove</div>
                </div>
                <div className='checkout-items-container'>
                    <div className='checkout-items'>
                        {cartItems.map((item) => (
                            <CheckoutItem key={item.id} cartItem={item}/>
                        ))}      
                    </div>
                </div>
                <div className='item-subtotal'>
                        <div>Total: ${cartTotal} </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Checkout;