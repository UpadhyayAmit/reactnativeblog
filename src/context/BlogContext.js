import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogpost':
      return action.payload;
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 9999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
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

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');
    dispatch({ type: 'get_blogpost', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogPosts', {
      title: title,
      content: content,
    });
    // dispatch({
    //   type: 'add_blogpost',
    //   payload: { title: title, content: content },
    // });
    if (callback) callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (title, content, id, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, {
      title: title,
      content: content,
    });
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
    getBlogPosts: getBlogPosts,
  },
  []
);
