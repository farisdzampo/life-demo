import React from "react";
import { View, FlatList } from "react-native";
import Search from "../components/searchbar.component";
import { SingleProduct } from "../components/singleProduct.component";
import productsData from "../data/product-data.json";

import { SafeArea } from "../utils/SafeArea";

export const ProductsScreen = () => {
  return (
    <SafeArea>
      <Search />
      <FlatList
        data={productsData}
        renderItem={({ item }) => <SingleProduct product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </SafeArea>
  );
};
