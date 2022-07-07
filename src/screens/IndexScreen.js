import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(BlogContext);

  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add Blog" onPress={addBlogPost} />
      <FlatList
        data={state}
        keyExtractor={(blogPosts) => {
          blogPosts.title;
        }}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({});
export default IndexScreen;
