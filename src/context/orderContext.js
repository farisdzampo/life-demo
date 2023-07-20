import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState({});

  const addOrderItem = (storeName, product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[storeName] = [...(updatedCart[storeName] || []), product];
      return updatedCart;
    });
  };
  const deleteOrder = (storeName) => {
    setOrder((prevOrder) =>
      prevOrder.filter((order) => order.storeName !== storeName)
    );
  };

  return (
    <OrderContext.Provider value={{ order, cart, addOrderItem, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export { OrderProvider, useOrderContext };
