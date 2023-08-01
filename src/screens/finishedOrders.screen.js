import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Modal } from "react-native-paper";
import { View, FlatList, Image } from "react-native";
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
} from "../utils/Styles";
// import { ModalComponent } from "../components/modal.component";

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
                      <View style={{ marginTop: 10 }}>
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
