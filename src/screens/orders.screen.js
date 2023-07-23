import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { styled } from "styled-components";
import { Cart } from "../components/cart.component";
import { useOrderContext } from "../context/orderContext";

const OrdersContainer = styled(View)`
  padding: 10px;
`;

const SubmitBtn = styled(Button)`
  width: 120px;
  padding: 2px;
  margin: 20px auto;
`;

export const OrdersScreen = ({ navigation }) => {
  // const { order, cart, addOrderItem, deleteOrder } = useOrderContext();
  const [subject, setSubject] = useState("");
  const [showCart, setShowCart] = useState(false);

  // const handleAddToCart = (storeName, product) => {
  //   addOrderItem(storeName, product);
  // };

  const handleSubjectChange = (subj) => {
    setSubject(subj);
  };

  const submitStoreNameButton = () => {
    navigation.navigate("Proizvodi", { subject });
    setShowCart(true);
  };

  const submitOrderButton = () => {
    navigation.navigate("Gotove Narudzbe", { subject });
    setShowCart(false);
    setSubject("");
  };

  return (
    <OrdersContainer>
      {!showCart ? (
        <>
          <TextInput
            onChangeText={handleSubjectChange}
            value={subject}
            label="Upiši prodavnicu"
            mode="flat"
          />
          <SubmitBtn onPress={submitStoreNameButton} mode="contained">
            Potvrdi
          </SubmitBtn>
        </>
      ) : (
        <>
          <Cart storeName={subject} />
          <SubmitBtn mode="contained" onPress={submitOrderButton}>
            Potvrdi
          </SubmitBtn>
        </>
      )}
    </OrdersContainer>
  );
};
