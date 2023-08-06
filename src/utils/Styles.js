import React from "react";
import styled from "styled-components";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const WrapperFull = styled(View)``;

export const FlatListContainer = styled(View)`
  height: 100%;
`;

export const OrderContainer = styled(TouchableOpacity)`
  align-items: center;
`;

export const OrderText = styled(Text)`
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

export const OrderTextContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled(Text)`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

export const ModalCloseBtn = styled(TouchableOpacity)`
  border-radius: 6px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #2596be;
  margin-bottom: 5px;
`;

export const ModalCloseTxt = styled(Text)`
  color: white;
  font-size: 20px;
  letter-spacing: 1px;
`;

export const ModalContent = styled(View)`
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 350px;
`;

export const ModalText = styled(Text)`
  background-color: white;
  width: 350px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1px;
`;

export const ModalListText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
`;

export const ModalListTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 350px;
`;

export const TotalContainer = styled(View)`
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  border: 1px solid;
  border-color: #2596be;
`;

export const TotalText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;

export const ModalContentWrapper = ({ children }) => {
  return <ModalContent>{children}</ModalContent>;
};
