import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { styled } from "styled-components";
import { Cart } from "../components/cart.component";

const OrdersContainer = styled(View)`
  padding: 10px;
`;

const SubmitBtn = styled(Button)`
  width: 120px;
  padding: 2px;
  margin: 20px auto;
`;

export const OrdersScreen = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [showCart, setShowCart] = useState(false);

  const handleSubjectChange = (subj) => {
    setSubject(subj);
  };

  const submitStoreNameButton = () => {
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
          <Cart />
          <SubmitBtn mode="contained" onPress={submitOrderButton}>
            Potvrdi
          </SubmitBtn>
        </>
      )}
    </OrdersContainer>
  );
};
