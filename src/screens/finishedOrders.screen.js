import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import styled from "styled-components";
import { List, Modal } from "react-native-paper";
import { View, Text, FlatList } from "react-native";
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
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
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

  // const [expanded, setExpanded] = useState(true);

  // const handlePress = () => setExpanded(!expanded);
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

  // const selectedCartInfo = cartInfo.filter(
  //   (item, index) => item.name === selectedItem && index < dataArray.length - 1
  // );

  //CARTINFO ARRAY CHANGE LOGIC

  let isItemSelected = false; // Flag to indicate if the selectedItem is found in the array

  const selectedCartInfo = cartInfo.filter((item) => {
    if (typeof item === "string" && item === selectedItem) {
      isItemSelected = true;
      return false; // Exclude the selectedItem from the new array
    }
    return true; // Include other items in the new array
  });

  // The isItemSelected variable now tells us if the selectedItem is present in the array or not
  // console.log("Is selectedItem found in the array?", isItemSelected);
  // console.log("New array without selectedItem:", selectedCartInfo);

  const keyExtractor = (item, index) => index.toString();

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
      {modalVisible && ( // Only render the Modal when modalVisible is true
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
                      <View>
                        <View>
                          <Text>{item.name}</Text>
                          <Text>{item.price} KM</Text>
                          <Text>{item.pieces}x</Text>
                          <Text>
                            TOTAL: {(item.price * item.pieces).toFixed(2)} KM
                          </Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
                {/* Add additional content for the modal if needed */}
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

{
  /* <List.Accordion
title="Controlled Accordion"
left={props => <List.Icon {...props} icon="folder" />}
expanded={expanded}
onPress={handlePress}>
<List.Item title="First item" />
<List.Item title="Second item" />
</List.Accordion>
</List.Section> */
}

{
  /* <OrderContainer>
<OrderTextContainer>    
  {typeof item === "string" && <OrderText>{item}</OrderText>}
</OrderTextContainer>
</OrderContainer> */
}

{
  /* <View>
      {inputtedValues.length > 0 ? (
        <FlatList
          data={inputtedValues}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <List.Accordion
              title={typeof item === "string" && `${item}`}
              left={(props) => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          )}
        />
      ) : (
        errorText()
      )}
    </View> */
}
