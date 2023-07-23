import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import styled from "styled-components";

import { View, Text, FlatList } from "react-native";

const OrderContainer = styled(TouchableOpacity)`
  align-items: center;
`;

const OrderText = styled(Text)`
  font-size: 30px;
  margin-top: 10px;
  background-color: #2596be;
  padding: 2px;
  width: 200px;
  height: 45px;
  text-align: center;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
`;

const OrderTextContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled(Text)`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

export const FinishedOrdersScreen = () => {
  const route = useRoute();
  const errorText = () => {
    return (
      <View>
        <ErrorText>Nema dodane prodavnice</ErrorText>
      </View>
    );
  };

  const subject = route.params?.subject;

  const [latestSubject, setLatestSubject] = useState(null);

  const [inputtedValues, setInputtedValues] = useState([]);

  const handleAddValue = () => {
    if (subject && Object.keys(subject).length > 0) {
      setLatestSubject(subject);
      setInputtedValues((prevValues) => [...prevValues, subject]);
    }
  };

  useEffect(() => {
    handleAddValue();
  }, [subject]);

  const keyExtractor = (item, index) => index.toString();

  return (
    <View>
      {inputtedValues.length > 0 ? (
        <FlatList
          data={inputtedValues}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <OrderContainer>
              <OrderTextContainer>
                <OrderText>{item}</OrderText>
              </OrderTextContainer>
            </OrderContainer>
          )}
        />
      ) : (
        errorText()
      )}
    </View>
  );
};
