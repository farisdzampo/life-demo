import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Search from "./src/components/searchbar.component";
import { SafeArea } from "./src/utils/SafeArea";
import { Searchbar } from "react-native-paper";
import { ProductsScreen } from "./src/screens/products.screen";
import { AppNavigator } from "./src/navigation/app.navigator";
import { NavigationContainer } from "@react-navigation/native";
import { OrderProvider } from "./src/context/orderContext";

export default function App() {
  return (
    <OrderProvider>
      <NavigationContainer>
        <SafeArea>
          <View style={styles.container}>
            {/* <ProductsScreen /> */}
            <AppNavigator />
            <StatusBar style="auto" />
          </View>
        </SafeArea>
      </NavigationContainer>
    </OrderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
