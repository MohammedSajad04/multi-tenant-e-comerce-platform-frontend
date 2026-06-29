import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    });

    const [buyNowProduct, setBuyNowProduct] = useState(null);

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);



    const addToCart = (product) => {

        const existing = cartItems.find(

            item => item.id === product.id

        );

        if (existing) {

            setCartItems(

                cartItems.map(item =>

                    item.id === product.id

                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }

                        : item

                )

            );

        } else {

            setCartItems([

                ...cartItems,

                {
                    ...product,
                    quantity: 1,
                }

            ]);

        }

    };



    const removeFromCart = (id) => {

        setCartItems(

            cartItems.filter(

                item => item.id !== id

            )

        );

    };



    const increaseQuantity = (id) => {

        setCartItems(

            cartItems.map(item =>

                item.id === id

                    ? {

                        ...item,

                        quantity: item.quantity + 1,

                    }

                    : item

            )

        );

    };



    const decreaseQuantity = (id) => {

        setCartItems(

            cartItems.map(item =>

                item.id === id && item.quantity > 1

                    ? {

                        ...item,

                        quantity: item.quantity - 1,

                    }

                    : item

            )

        );

    };



    const clearCart = () => {

        setCartItems([]);

    };



    // ===========================
    // BUY NOW
    // ===========================

    const buyNow = (product) => {

        setBuyNowProduct({

            ...product,

            quantity: 1,

        });

    };



    const clearBuyNow = () => {

        setBuyNowProduct(null);

    };



    return (

        <CartContext.Provider

            value={{

                cartItems,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                buyNowProduct,

                buyNow,

                clearBuyNow,

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export const useCart = () => useContext(CartContext);