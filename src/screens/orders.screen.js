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
  width: 250px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 20px auto;
`;

export const OrdersScreen = ({ navigation }) => {
  const { order, cart, resetOrder, setOrder } = useOrderContext();
  // const [finishedCart, setFinishedCart] = useState([]);
  const [subject, setSubject] = useState("");
  const [showCart, setShowCart] = useState(false);

  const cartInfo = [...order, subject];

  // const updateCartData = (cartData) => {
  //   //novo
  //   setFinishedCart(cartData);
  //   console.log("cartData", cartData);
  // };

  const handleSubjectChange = (subj) => {
    setSubject(subj);
  };

  // const handleAddSubject = () => {
  //   setOrder([...order, subject]);
  // };

  const submitStoreNameButton = () => {
    navigation.navigate("Proizvodi", { subject });
    setShowCart(true);
  };

  const submitOrderButton = () => {
    // updateCartData(); //novo
    navigation.navigate("Gotove Narudzbe", { cartInfo }); //bilo subject
    // handleAddSubject();
    // console.log("finishedCart", finishedCart);
    setShowCart(false);
    setSubject("");
    resetOrder();
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
            DODAJ PRODAVNICU
          </SubmitBtn>
        </>
      )}
    </OrdersContainer>
  );
};
