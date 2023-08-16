import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  DELETE,
  COMMENT,
  UPDATE,
} from "../constants/actionTypes";
import * as api from "../api/index.js"; // this means we import every thing from actions as api
// or import * as api from '../api' ;

// Action Creators -> these are the function that return action
//video 1:01:17

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data }); // payload is data where we will store all of our posts
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    // console.log(page);
    console.log(data);

    dispatch({ type: FETCH_ALL, payload: data }); // payload is data where we will store all of our posts
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);

    // console.log(post);
    /*
     const response = await api.createPost(post);
    if(response.status === 201){
      alert("User created successfully")

    }
    else if(response.status === 500){
      alert("Internal server error. Please try again")
    }
    else if(response.status === 409){
      alert(response.data.message.error)
    } 
    */

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
    // console.log("here is your error") --> this is the place from where i am getting error
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
    console.log("here is your error");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); // we are  not interested in return data we only want to delete the data

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    console.log(data);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
    console.log("comment error");
  }
};
