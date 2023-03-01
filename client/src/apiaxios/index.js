import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8000/posts';

// why axios not using .then methos why because create async thunk automatically manage the req res operation that's why we don't want it
export const fetchPosts = createAsyncThunk('dataFetching', async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addPost = createAsyncThunk('addPost', async (post) => {
  const response = await axios.post(url, post);
  return response.data;
});

export const updatePost = createAsyncThunk(
  'posts/updation',
  async ({ id, postDatas }) => {
    try {
      const response = await axios.patch(`${url}/${id}`, postDatas, {
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
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
});

export const likePost = createAsyncThunk('posts/like', async ({ id }) => {
  const response = await axios.patch(`${url}/${id}/likepost`);
  return response.data;
});
