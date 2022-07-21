import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const EditScreen = ({ navigation }) => {
  const { state } = useContext(BlogContext);
  const blogPost = state.find((blog) => blog.id === navigation.getParam('id'));
  const [title, setTitle] = useState(blogPost.title);
  const [content, setContent] = useState(blogPost.content);
  return (
    <View>
      <Text style={Styles.label}>Enter Title</Text>
      <TextInput
        style={Styles.input}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <Text style={Styles.label}>Enter Content</Text>
      <TextInput
        style={Styles.input}
        value={content}
        onChangeText={(text) => {
          setContent(text);
        }}
      />
      <Button
        title="Edit Blog Post"
        onPress={() => {
          addBlogPost(title, content, () => {
            navigation.navigate('Index');
          });
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    margin: 5,
    padding: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});
export default EditScreen;
