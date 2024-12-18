import { createContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart: any[]; 
  isLoggedIn: boolean;
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setIsLoggedIn: (status: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, isLoggedIn, addToCart, removeFromCart, clearCart, setIsLoggedIn }}>
      {children}
    </CartContext.Provider>
  );
};
