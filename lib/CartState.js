
import { set } from "nprogress";
import { createContext,  useContext  } from "react";
import { useState } from "react/cjs/react.development";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  
  function openCart() {
    setCartOpen(true)
  }
  function closeCart() {
    setCartOpen(false)
  }
  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, openCart, closeCart }}>{children}</LocalStateProvider>
  );
}



function useCart() {
  const context = useContext(LocalStateContext);
  return context;
}

export { CartStateProvider, useCart };
