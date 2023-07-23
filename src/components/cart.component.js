import React from "react";
import styled from "styled-components";
import { View, Text, FlatList, Image } from "react-native";
import { useOrderContext } from "../context/orderContext";

const StoreNameText = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: #2596be;
  text-align: center;
  margin-bottom: 10px;
`;

const CartContainer = styled(View)``;

const CartItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CartItemText = styled(Text)`
  font-size: 20px;
  margin-right: 20px;
`;

export const Cart = (props) => {
  const { order } = useOrderContext();

  return (
    // <View>
    //   <Text>{props.storeName}</Text>
    //   <FlatList
    //     data={order.filter((item) => item.storeName === props.storeName)}
    //     data={order}
    //     renderItem={({ item }) => <Text>{item.product}</Text>}
    //     keyExtractor={(item) => item.product.id.toString()}
    //   />
    // </View>
    <View>
      <StoreNameText>{props.storeName}</StoreNameText>
      <FlatList
        data={order}
        renderItem={({ item }) => (
          <View>
            <CartItemContainer>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, marginBottom: 10 }}
              />
              <CartItemText>{item.name}</CartItemText>
              <CartItemText>{item.price} KM</CartItemText>
              <Text>total</Text>
            </CartItemContainer>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
