import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import styled from "styled-components";
import { List, Modal } from "react-native-paper";
import { View, Text, FlatList, Image } from "react-native";
// import { ModalComponent } from "../components/modal.component";

const WrapperFull = styled(View)`
  height: 70%;
`;

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

const ModalCloseBtn = styled(TouchableOpacity)`
  border-radius: 6px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #2596be;
`;

const ModalCloseTxt = styled(Text)`
  color: white;
  font-size: 20px;
  letter-spacing: 1px;
`;

const ModalContent = styled(View)`
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 350px;
`;

const ModalText = styled(Text)`
  background-color: white;
  width: 350px;
  font-size: 24px;
  margin-bottom: 35px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ModalListText = styled(Text)`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
`;

const ModalListTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 350px;
`;

const TotalContainer = styled(View)`
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
`;

const TotalText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;

const ModalContentWrapper = ({ children }) => {
  return <ModalContent>{children}</ModalContent>;
};

export const FinishedOrdersScreen = () => {
  const [inputtedValues, setInputtedValues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const route = useRoute();
  const errorText = () => {
    return (
      <View>
        <ErrorText>Nema dodane prodavnice</ErrorText>
      </View>
    );
  };
  const cartInfo = route.params?.cartInfo;

  const handleModalVisible = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAddValue = () => {
    if (cartInfo && Array.isArray(cartInfo) && cartInfo.length > 0) {
      setInputtedValues((prevValues) => [...prevValues, ...cartInfo]);
    }
  };

  useEffect(() => {
    handleAddValue();
  }, [cartInfo]);

  // const storeName = inputtedValues[inputtedValues.length - 1];

  //CARTINFO ARRAY CHANGE LOGIC

  let isItemSelected = false; 
  let selectedCartInfo;
  if (cartInfo) {
    selectedCartInfo = cartInfo.filter((item) => {
      if (typeof item === "string" && item === selectedItem) {
        isItemSelected = true;
        return false; // Exclude the selectedItem from the new array
      }
      return true; // Include other items in the new array
    });
  } else {
    errorText();
  }

  const keyExtractor = (item, index) => index.toString();

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.pieces * item.price;
    });

    return totalPrice.toFixed(2);
  };

  return (
    <WrapperFull>
      {inputtedValues.length > 0 ? (
        <FlatList
          data={inputtedValues}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <OrderContainer onPress={() => handleModalVisible(item)}>
              <OrderTextContainer>
                {typeof item === "string" && <OrderText>{item}</OrderText>}
              </OrderTextContainer>
            </OrderContainer>
          )}
        />
      ) : (
        errorText()
      )}
      {modalVisible && ( 
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginTop: 200,
          }}
        >
          <ModalContentWrapper>
            {selectedItem && (
              <>
                <ModalText>{selectedItem}</ModalText>
                <View>
                  <FlatList
                    data={selectedCartInfo}
                    renderItem={({ item }) => (
                      <View style={{marginTop: 10}}>
                        <ModalListTextContainer>
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 50, height: 50, marginBottom: 10 }}
                          />
                          <ModalListText>{item.price} KM</ModalListText>
                          <ModalListText>{item.pieces}x</ModalListText>
                          <ModalListText>
                            TOTAL: {(item.price * item.pieces).toFixed(2)} KM
                          </ModalListText>
                        </ModalListTextContainer>
                      </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
                <TotalContainer>
                  <TotalText>
                    UKUPNO: {calculateTotalPrice(selectedCartInfo)} KM
                  </TotalText>
                </TotalContainer>
              </>
            )}
            <ModalCloseBtn onPress={() => setModalVisible(false)}>
              <ModalCloseTxt>ZATVORI</ModalCloseTxt>
            </ModalCloseBtn>
          </ModalContentWrapper>
        </Modal>
      )}
    </WrapperFull>
  );
};
