import React, { useState } from 'react';

const BlogContext = React.createContext();
export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPost] = useState([]);

  const addBlogPost = () => {
    setBlogPost([
      ...blogPosts,
      { title: `Blog post #${blogPosts.length + 1}` },
    ]);
  };

  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost: addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
