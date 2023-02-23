
const LOCALSTORAGE_CART_KEY = "eshop_cart";

export function addProductToCart(product, quantity, size) {
    let cartStr = localStorage.getItem(LOCALSTORAGE_CART_KEY);

    const cartItem = {
        product,
        quantity, 
        size
    };

    if(cartStr === null) {
        const cartItems = [cartItem];
        localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cartItems));
        return;
    }

    const cartItems = JSON.parse(cartStr);
    cartItems.push(cartItem);
    localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cartItems));
}

/**
 * @returns returns cart items in array
 *  */  
export function getCartProducts() {
    let cartStr = localStorage.getItem(LOCALSTORAGE_CART_KEY);
    if(cartStr === null) {
        return [];
    }

    const cartItems = JSON.parse(cartStr);
    return cartItems;
}

export function deleteCartItem(index) {
    let cartStr = localStorage.getItem(LOCALSTORAGE_CART_KEY);
    if(cartStr === null) {
        return [];
    }

    const cartItems = JSON.parse(cartStr);
    const newCartItems = cartItems.filter((item, i) => i !== index);
    localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(newCartItems));
    return newCartItems;
}