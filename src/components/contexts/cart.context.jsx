import { createContext, useState, useEffect } from 'react';
import { ProductsProvider } from './products.context';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

        if(existingCartItem) {
            return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity +1 }
                : cartItem
            );
        }

    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id )
}

const reduceCartItemQuantity = (cartItems, productToReduce) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToReduce.id
        ); 

        if(existingCartItem) {
            return cartItems.map((cartItem) => 
                cartItem.id === productToReduce.id && cartItem.quantity > 1
                    ? {...cartItem, quantity: cartItem.quantity -1}
                    : cartItem
             );
         }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])
    
    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const reduceItemQuantity = (productToReduce) => {
        setCartItems(reduceCartItemQuantity(cartItems, productToReduce));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, reduceItemQuantity, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

