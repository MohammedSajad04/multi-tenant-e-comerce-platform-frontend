import {

    createContext,
    useContext,
    useState

} from "react";



const CartContext = createContext();



export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);




    const addToCart = (product) => {

        const existing = cartItems.find(

            (item) => item.id === product.id
        );


        if (existing) {

            const updatedCart = cartItems.map((item) =>

                item.id === product.id

                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }

                    : item
            );

            setCartItems(updatedCart);

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

        const updated = cartItems.filter(

            (item) => item.id !== id
        );

        setCartItems(updated);
    };




    const clearCart = () => {

        setCartItems([]);
    };



    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >

            {children}

        </CartContext.Provider>
    )
}



export const useCart = () => useContext(CartContext);
