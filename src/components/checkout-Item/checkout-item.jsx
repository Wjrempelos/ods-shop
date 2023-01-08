import { useContext } from 'react';

import { CartContext } from '../contexts/cart.context';

import './checkout-item.scss';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { removeItemFromCart, addItemToCart, reduceItemQuantity } = useContext(CartContext);

    const removeProductFromCart = () => removeItemFromCart(cartItem);
    const addProductToCart = () => addItemToCart(cartItem);
    const reduceQuantity = () => reduceItemQuantity(cartItem)
    const totalItemPrice = price * quantity

    return(
        <div className='checkout-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='checkout-item-details'>
                <div className='name'>{name}</div>
                <div className='quantity'>
                  <button onClick={reduceQuantity}> {'<'} </button>
                   {quantity} 
                  <button onClick={addProductToCart}> {'>'} </button>
                </div>
                <div className='price'>{`$${totalItemPrice}`} {`($${price} each)`}</div>
                <button onClick={removeProductFromCart} className='remove'>
                    X
                </button>
            </div>
        </div>
    );
};

export default CheckoutItem;