import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import Search from "../components/searchbar.component";
import { SingleProduct } from "../components/singleProduct.component";
import productsData from "../data/product-data.json";
// import { useOrderContext } from "../context/orderContext";

import { SafeArea } from "../utils/SafeArea";

export const ProductsScreen = () => {
  const route = useRoute();
  const storeName = route.params?.subject;

  // const { order, cart, addOrderItem, deleteOrder } = useOrderContext();

  // const handleAddToCart = (storeName, product) => {
  //   addOrderItem(storeName, product);
  // };

  return (
    <SafeArea>
      <Search />
      <FlatList
        data={productsData}
        renderItem={({ item }) => <SingleProduct product={item} storeName={storeName} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </SafeArea>
  );
};
