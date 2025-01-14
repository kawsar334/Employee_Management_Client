import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartContext = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
   
        setCart(() => {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        })
        setWishlist(() => {
            const storedWishlist = localStorage.getItem("wislist");
            return storedWishlist ? JSON.parse(storedWishlist) : []
        });
    }, [])

  
    
    const [purchase, setParchase] = useState(() => {
        const storedPurchase = localStorage.getItem("purchase");
        return storedPurchase ? JSON.parse(storedPurchase) : []
    });

    const [sortedProduct, setSortedProduct] = useState([])


    const addToCart = (item) => {
        setCart((prev) => {
            const itemExists = prev.some((cartItem) => cartItem.product_id === item.product_id);

            if (itemExists) {
                toast.warn(`${item?.product_title} is already in the cart!`, {
                    position: "top-center"
                });
                return prev; 
            } else {
                const updatedCart = [...prev, item];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                toast.success(`${item?.product_title} added to cart!`, {
                    position: "top-center"
                });
                return updatedCart;
            }
        });
        // console.log(item.product_id)
        setWishlist((prevWishlist) => {
            const updatedWishlist = prevWishlist.filter(
                (wishlistItem) => wishlistItem.product_id !== item.product_id 
            );
            localStorage.setItem('wislist', JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };
   


// add wislitt
    const addToWishlist = (item) => {
        setWishlist((prev) => {
            const itemExists = prev.some((wishItem) => wishItem.product_id === item.product_id);
            if(itemExists){
                toast.warn(`${item?.product_title} is already in the wishlist!`, {
                    position: "top-center"
                });
                return prev;
            }else{
                const updatedWishlist = [...prev, item];
                localStorage.setItem('wislist', JSON.stringify(updatedWishlist));
                toast.success(`${item?.product_title} added to wishlist!`, {
                    position: "top-center"
                });
                return updatedWishlist;
            }
        })
    }


    const addToParchase = (item) => {
        setParchase((prev) => {
            const updatedPurchase = [...prev, item];

            localStorage.setItem("purchase", JSON.stringify(updatedPurchase));
        })

    }
    // descending  list
    const descendingProductList = () => {
        if(cart?.length <=1){
            toast.error("cannot short less than 2 item", {
                position: "top-center"
            });
            return;
        }else{

            const sortedCart = [...cart].sort((a, b) => b.price - a.price);
            setCart(sortedCart);
            localStorage.setItem("cart", JSON.stringify(sortedCart));
            toast.success("Sorted product list", {
                position: "top-center"
            });
        }

    }

    // remove from card   func... 
    const removeFromCart = (itemId) => {
        setCart((prev) => {
            const updatedCart = prev.filter(item => item?.product_id !== itemId.product_id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.error(`you removed ${itemId.product_title} .. from cart List`, {
                position: "top-center"
            })
            return updatedCart;
        });
    };

    // Remove from wwwshlist..
    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => {
            const updatedWishlist = prev.filter(item => item?.product_id !== itemId.product_id);
            localStorage.setItem("wislist", JSON.stringify(updatedWishlist));
            toast.error(`you removed ${itemId.product_title} .. from wislist List`, {
                position: "top-center"
            })
            return updatedWishlist;
        });
    };
    // Remove from purchase list
    const removeFromPurchase = (itemId) => {
        setPurchase((prev) => {
            const updatedPurchase = prev.filter(item => item.id !== itemId);
            localStorage.setItem("purchase", JSON.stringify(updatedPurchase));
            return updatedPurchase;
        });
    };


    useEffect(() => {
        const calculateTotalPrice = () => {
            return cart.reduce((total, item) => total + item.price, 0);
        };
        setTotalPrice(calculateTotalPrice());
    }, []);


    const addToCartFromWishlist = (itemId) => {
        setWishlist((prevWishlist) => {
            const item = prevWishlist.find(wishItem => wishItem.product_id === itemId.product_id);
            if (item) {
                setCart((prevCart) => {
                    const updatedCart = [...prevCart, item].sort((a, b) => b.price - a.price);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    toast.success(`${item?.product_title} added to cart from wishlist!`, { position: "top-center" });
                    return updatedCart;
                });
                const updatedWishlist = prevWishlist.filter(wishItem => wishItem.product_id !== itemId.product_id);
                localStorage.setItem('wislist', JSON.stringify(updatedWishlist));
                return updatedWishlist;
            }
            return prevWishlist;
        });
    };




    return {
        cart,
        totalPrice,
        wishlist,
        purchase,
        addToCart,
        addToWishlist,
        addToParchase,
        descendingProductList,
        sortedProduct,
        removeFromCart,
        removeFromWishlist,
        removeFromPurchase,
        addToCartFromWishlist,
    }
}

export default CartContext