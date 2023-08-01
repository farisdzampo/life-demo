import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Searchbar } from "react-native-paper";

const Search = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const onChangeSearch = (keyword) => {
    setSearchKeyword(keyword);
    onSearch(keyword); // Call the onSearch callback with the keyword
  };

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        icon="archive-search-outline"
        clearIcon="delete"
        placeholder="Traži proizvod"
        onChangeText={onChangeSearch}
        value={searchKeyword}
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "black",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: "white",
  },
});

export default Search;
