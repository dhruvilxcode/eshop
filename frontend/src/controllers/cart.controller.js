
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