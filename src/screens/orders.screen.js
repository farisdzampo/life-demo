import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { styled } from "styled-components";

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

  const handleSubjectChange = (subj) => {
    setSubject(subj);
  };

  const submitButton = () => {
    navigation.navigate("Gotove Narudzbe", { subject });
    setSubject("");
  };

  return (
    <OrdersContainer>
      <TextInput
        onChangeText={handleSubjectChange}
        value={subject}
        label="Upiši prodavnicu"
        mode="flat"
      />
      <SubmitBtn onPress={submitButton} mode="contained">
        Potvrdi
      </SubmitBtn>
    </OrdersContainer>
  );
};
