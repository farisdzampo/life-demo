import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components";
import { Button } from "react-native-paper";
import { useOrderContext } from "../context/orderContext";

const ComponentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const PriceText = styled.Text`
  color: #2596be;
  font-weight: bold;
  font-size: 16px;
`;

// const ProductImg = styled(Image)`
//   border-width: 0px;
//   border-style: solid;
//   border-color: #2596be;
//   border-radius: 6px;
// `;

const ProductWrapper = styled(View)`
  padding: 20px;
  margin: 10px;
  align-items: center;
  width: 180px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: #2596be;
`;

export const SingleProduct = ({ product, storeName }) => {
  const { order, cart, addOrderItem, deleteOrder, addPackageToItem } =
    useOrderContext();

  const handleAddToCart = () => {
    addOrderItem(product);
  };

  const handleAddPackageToCart = () => {
    addPackageToItem(product);
  };

  return (
    <ScrollView>
      <ComponentContainer>
        <ProductWrapper>
          <Image
            source={{ uri: product.image }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
          <NameText>{product.name}</NameText>
          <PriceText>{product.price} KM</PriceText>
          <Text>Paket: {product.package} kom</Text>
          <Button
            icon="plus"
            mode="contained"
            style={{ marginTop: 10 }}
            onPress={handleAddToCart}
            buttonColor="#2596be"
          >
            KOMAD
          </Button>
          <Button
            icon="plus"
            mode="contained"
            style={{ marginTop: 10 }}
            onPress={handleAddPackageToCart}
            buttonColor="#2596be"
          >
            PAKET
          </Button>
        </ProductWrapper>
      </ComponentContainer>
    </ScrollView>
  );
};
