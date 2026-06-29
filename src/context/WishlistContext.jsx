import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlistItems, setWishlistItems] = useState(() => {

        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist
            ? JSON.parse(savedWishlist)
            : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlistItems)
        );

    }, [wishlistItems]);



    const isInWishlist = (id) => {

        return wishlistItems.some(
            item => item.id === id
        );

    };



    const addToWishlist = (product) => {

        if (isInWishlist(product.id)) return;

        setWishlistItems(prev => [

            ...prev,

            product

        ]);

    };



    const removeFromWishlist = (id) => {

        setWishlistItems(prev =>

            prev.filter(
                item => item.id !== id
            )

        );

    };



    const toggleWishlist = (product) => {

        if (isInWishlist(product.id)) {

            removeFromWishlist(product.id);

        } else {

            addToWishlist(product);

        }

    };



    const clearWishlist = () => {

        setWishlistItems([]);

    };



    return (

        <WishlistContext.Provider
            value={{

                wishlistItems,

                addToWishlist,

                removeFromWishlist,

                toggleWishlist,

                isInWishlist,

                clearWishlist,

            }}
        >

            {children}

        </WishlistContext.Provider>

    );
}

export const useWishlist = () =>
    useContext(WishlistContext);