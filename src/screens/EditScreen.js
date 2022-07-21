import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(BlogContext);
  const id = navigation.getParam('id');
  console.log(id);
  const blogPost = state.find((blog) => blog.id === id);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(title, content, id, () => {
          navigation.pop();
        });
      }}
    />
  );
};

const Styles = StyleSheet.create({});
export default EditScreen;
