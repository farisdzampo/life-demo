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

export const FinishedOrdersScreen = () => {
  const route = useRoute();
  const { subject } = route.params;
  const [inputtedValues, setInputtedValues] = useState([]);
  const handleAddValue = () => {
    setInputtedValues((prevValues) => [...prevValues, subject]);
  };

  useEffect(() => {
    if (subject !== undefined) {
      handleAddValue();
    }
  }, [subject]);

  const keyExtractor = (item, index) => index.toString();
  //   if(!subject || subject.length === 0) {
  //     return <Text>Nema dodane prodavnice</Text>
  //   }

  const data = [subject];

  return (
    <View>
      {!subject || subject.length === 0 ? (
        <View>
          <Text>Nema dodane prodavnice</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};
