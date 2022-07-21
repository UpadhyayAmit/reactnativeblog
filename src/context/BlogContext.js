import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'delete_blogpost':
      return state.filter((blogPost) => {
        blogPost.id !== action.payload;
      });
    case 'edit_blogpost':
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog;
      });
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: 'add_blogpost',
      payload: { title: title, content: content },
    });
    if (callback) callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (title, content, id, callback) => {
    dispatch({
      type: 'edit_blogpost',
      payload: { title: title, content: content, id: id },
    });
    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost: addBlogPost,
    deleteBlogPost: deleteBlogPost,
    editBlogPost: editBlogPost,
  },
  [{ title: 'Test Post', content: 'Content', id: 1 }]
);
