"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";


export interface CartItem {
  id: number;

  title: string;

  price: number;

  image: string;

  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  clearCart: () => void;

  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  /*
    Load cart from localStorage
  */

  useEffect(() => {
    const savedCart = localStorage.getItem("fastbuy-cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setIsCartLoaded(true);
  }, []);

  /*
    Save cart whenever cart changes
  */

useEffect(() => {

  if(!isCartLoaded) return;


  localStorage.setItem(
    "fastbuy-cart",
    JSON.stringify(cartItems)
  );


}, [cartItems, isCartLoaded]);
  /*
    Add item to cart
  */

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((product) => product.id === item.id);

    toast.success(
      existingItem
        ? `${item.title} quantity updated.`
        : `${item.title} added to cart.`,
    );

    setCartItems((previous) => {
      if (existingItem) {
        return previous.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity + 1,
              }
            : product,
        );
      }

      return [...previous, item];
    });
  };

  /*
    Remove complete product
  */

  const removeFromCart = (id: number) => {
    const removedItem = cartItems.find((item) => item.id === id);

    if (removedItem) {
      toast.success(`${removedItem.title} removed from cart.`);
    }

    setCartItems((previous) => previous.filter((item) => item.id !== id));
  };
  /*
    Increase quantity
  */

  const increaseQuantity = (id: number) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  /*
    Decrease quantity
  */

  const decreaseQuantity = (id: number) => {
    setCartItems((previous) =>
      previous.map((item) => {
        if (item.id === id) {
          return {
            ...item,

            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }

        return item;
      }),
    );
  };

  /*
    Clear entire cart
  */

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,

    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
