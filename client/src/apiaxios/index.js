import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  // console.log(req);
  return req;
});

// why axios not using .then methos why because create async thunk automatically manage the req res operation that's why we don't want it
export const fetchPosts = createAsyncThunk('dataFetching', async () => {
  const response = await API.get('/posts');
  return response.data;
});

export const fetchPostsBySearch = createAsyncThunk(
  'searchGetPosts',
  async ({ search, tags }) => {
    console.log(search, tags, 'axios');
    const response = await API.get(
      `/posts/search?searchQuery=${search}&tags=${tags}`
    );
    console.log(response.data.data, 'fetchBySearchPosts');
    return response.data.data;
  }
);

export const addPost = createAsyncThunk('addPost', async (post) => {
  const response = await API.post('/posts', post);
  return response.data;
});

export const updatePost = createAsyncThunk(
  'posts/updation',
  async ({ id, postDatas }) => {
    try {
      const response = await API.patch(`/posts/${id}`, postDatas, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk('posts/delete', async ({ id }) => {
  const response = await API.delete(`/posts/${id}`);
  return response.data;
});

export const likePost = createAsyncThunk('posts/like', async ({ id }) => {
  const response = await API.patch(`/posts/${id}/likepost`);
  return response.data;
});

//  USERS API SIGNIN SIGNUP ROUTE PAGES CREATE HERE ONLY KEEP CONSIOUS WATCHING THE CODE LINES

export const signIn = createAsyncThunk('signin', async (post) => {
  try {
    const response = await API.post('/users/signin', post);
    // console.log(response.data, 'from axios');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const signUp = createAsyncThunk('signup', async (post) => {
  try {
    const response = await API.post('/users/signup', post);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
