import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addOrderItem = (product) => {
    const existingItem = order.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item already exists in the cart, update the quantity
      setOrder((prevOrder) =>
        prevOrder.map((item) =>
          item.id === product.id ? { ...item, pieces: item.pieces + 1 } : item
        )
      );
    } else {
      // If the item is not in the cart, add it with an initial quantity of 1
      setOrder((prevOrder) => [...prevOrder, product]);
    }
  };

  const addPackageToItem = (product) => {
    const existingItem = order.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item already exists in the cart, update the quantity with the package amount multiplied by price
      setOrder((prevOrder) =>
        prevOrder.map((item) =>
          item.id === product.id
            ? { ...item, pieces: item.pieces + product.package }
            : item
        )
      );
    } else {
      // If the item is not in the cart, add it with the package amount multiplied by price
      setOrder((prevOrder) => [
        ...prevOrder,
        { ...product, pieces: product.package },
      ]);
    }
  };

  const resetOrder = (product) => {
    const cartInfo = [...order];
    setOrder([]);
  };

  const deleteOrder = (storeName) => {
    setOrder((prevOrder) =>
      prevOrder.filter((order) => order.storeName !== storeName)
    );
  };

  const deleteOrderItem = (itemId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== itemId));
  };
  
  return (
    <OrderContext.Provider
      value={{
        order,
        addOrderItem,
        deleteOrder,
        setOrder,
        resetOrder,
        addPackageToItem,
        deleteOrderItem,
      }}
    >
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
