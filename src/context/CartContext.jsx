// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CartContext = createContext({});

// eslint-disable-next-line react/prop-types
function CartContextProvider({ children }) {


  const contextData = {

  };

  return (
    <CartContext.Provider value={contextData}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;