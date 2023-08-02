import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Modal } from "react-native-paper";
import { View, FlatList, Image, ScrollView } from "react-native";
import {
  WrapperFull,
  OrderContainer,
  OrderText,
  OrderTextContainer,
  ErrorText,
  ModalCloseBtn,
  ModalCloseTxt,
  ModalText,
  ModalListText,
  ModalListTextContainer,
  TotalContainer,
  TotalText,
  ModalContentWrapper,
  FlatListContainer,
} from "../utils/Styles";

export const FinishedOrdersScreen = () => {
  const [inputtedValues, setInputtedValues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const route = useRoute();
  const errorText = () => {
    return (
      <View>
        <ErrorText>Nema dodane prodavnice</ErrorText>
      </View>
    );
  };
  const cartInfo = route.params?.cartInfo;

  const handleModalVisible = (storeName) => {
    setSelectedStore(storeName);
    setModalVisible(true);
  };

  const handleAddValue = () => {
    if (cartInfo && Array.isArray(cartInfo) && cartInfo.length > 0) {
      setInputtedValues((prevValues) => [...prevValues, cartInfo]);
    }
  };

  useEffect(() => {
    handleAddValue();
  }, [cartInfo]);

  const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) return 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      if (typeof item !== "string") {
        totalPrice += item.price * item.pieces;
      }
    });

    return totalPrice.toFixed(2);
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <WrapperFull>
      {inputtedValues.length > 0 ? (
        <FlatListContainer>
          <FlatList
            data={inputtedValues}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
              <OrderContainer
                onPress={() => handleModalVisible(item[item.length - 1])}
              >
                <OrderTextContainer>
                  {typeof item[item.length - 1] === "string" && (
                    <OrderText>{item[item.length - 1]}</OrderText>
                  )}
                </OrderTextContainer>
              </OrderContainer>
            )}
          />
        </FlatListContainer>
      ) : (
        errorText()
      )}
      {modalVisible && selectedStore && (
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginTop: 100,
            maxHeight: 470,
          }}
        >
          <ModalContentWrapper>
            <ModalText>{selectedStore}</ModalText>
            <ScrollView>
              {/* Render the cart items for the selected store */}
              {inputtedValues.map((cart) => {
                if (cart[cart.length - 1] === selectedStore) {
                  return cart.map((item, index) => {
                    if (typeof item !== "string") {
                      return (
                        <View key={index} style={{ marginTop: 10 }}>
                          <ModalListTextContainer>
                            <Image
                              source={{ uri: item.image }}
                              style={{
                                width: 50,
                                height: 50,
                                marginBottom: 10,
                              }}
                            />
                            <ModalListText>{item.price} KM</ModalListText>
                            <ModalListText>{item.pieces}x</ModalListText>
                            <ModalListText>
                              TOTAL: {(item.price * item.pieces).toFixed(2)} KM
                            </ModalListText>
                          </ModalListTextContainer>
                        </View>
                      );
                    }
                    return null; // Skip rendering the store name
                  });
                }
                return null;
              })}
            </ScrollView>
            {/* Calculate and display the total price */}
            <TotalContainer>
              <TotalText>
                UKUPNO:{" "}
                {calculateTotalPrice(
                  inputtedValues.find(
                    (cart) => cart[cart.length - 1] === selectedStore
                  )
                )}{" "}
                KM
              </TotalText>
            </TotalContainer>
            <ModalCloseBtn onPress={() => setModalVisible(false)}>
              <ModalCloseTxt>ZATVORI</ModalCloseTxt>
            </ModalCloseBtn>
          </ModalContentWrapper>
        </Modal>
      )}
    </WrapperFull>
  );
};
