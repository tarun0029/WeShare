import axios from "axios"; // to make api calls

const API = axios.create({ baseURL: "http://localhost:5000" });

// this url point to backend
// this going to return all the posts the we are currently have in database

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost); // url and data that we are sendigin
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

/*
before 
//const url = 'http://localhost:5000/posts';
// this url point to backend
// this going to return all the posts the we are currently have in database


export const fetchPosts = () => axios.get(url);
export const createPost = (newpost) => axios.post(url, newPost); // url and data that we are sendigin
export const updatePost = (id, updatePost) =>axios.patch(`${url}/${id}`,updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);


*/
