import {
    createContext,
    useContext,
    useState
} from "react";

const WishlistContext =
    createContext();

export function WishlistProvider({
    children
}) {

    const [
        wishlistItems,
        setWishlistItems
    ] = useState([]);

    const addToWishlist = (
        product
    ) => {

        const exists =
            wishlistItems.find(
                item =>
                    item.id === product.id
            );

        if (exists) return;

        setWishlistItems([
            ...wishlistItems,
            product
        ]);
    };

    const removeFromWishlist = (
        id
    ) => {

        setWishlistItems(
            wishlistItems.filter(
                item => item.id !== id
            )
        );
    };

    return (

        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist
            }}
        >

            {children}

        </WishlistContext.Provider>
    );
}

export const useWishlist =
    () =>
        useContext(
            WishlistContext
        );