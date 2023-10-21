import React, { useState, useMemo, useCallback } from "react";
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
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const renderItem = useMemo(() => {
    return ({ item }) => <SingleProduct product={item} storeName={storeName} />;
  }, [storeName]);

  const handleSearch = useCallback((keyword) => {
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, []);

  return (
    <SafeArea>
      <Search onSearch={handleSearch} />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </SafeArea>
  );
};
