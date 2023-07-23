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

const TotalText = styled(Text)`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
`;

const CartContainer = styled(View)``;

const CartItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CartItemText = styled(Text)`
  font-size: 20px;
  margin-right: 10px;
`;

export const Cart = (props) => {
  const { order } = useOrderContext();

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.pieces * item.price;
    });

    return totalPrice.toFixed(2);
  };

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
              {/* <CartItemText>{item.price} KM</CartItemText> */}
              <CartItemText>{item.pieces}x</CartItemText>
              <CartItemText>
                TOTAL: {(item.price * item.pieces).toFixed(2)} KM
              </CartItemText>
            </CartItemContainer>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View>
        <TotalText>RAČUN UKUPNO: {calculateTotalPrice(order)} KM</TotalText>
      </View>
    </View>
  );
};
