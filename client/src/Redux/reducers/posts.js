import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../apiaxios/index.js';

export const mongoSlice = createSlice({
  name: 'mongo',
  initialState: {
    value: [],
    loading: false,
  },
  // STANDARD LOGICS ONLY WRITE IN NOREMAL REDUCERS WHEN YOU USE CREATEASYNCTHUNK YOU MIGHT BE USE EXTRA REDUCERS ONLY..........
  extraReducers: {
    [api.fetchPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [api.fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    [api.fetchPosts.rejected]: (state, action) => {
      state.loading = true;
    },

    // ============================================================

    [api.addPost.pending]: (state, action) => {
      state.loading = true;
    },
    [api.addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.value.push(action.payload);
      state.value = [...state.value];
    },
    [api.addPost.rejected]: (state, action) => {
      state.loading = true;
    },

    // ==================================================

    [api.updatePost.pending]: (state, action) => {
      state.loading = true;
    },

    [api.updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action.payload, 'dfdsafdf');
      // state.value = state.value.map((mapData) =>
      //   mapData._id === action.payload._id ? action.payload : mapData
      // );
      // I'M USING FIND INDEX METHOD ON THE OTHER HAND YOU CAN ALOS USE MAP MEHTOD BOTH ARE SAME
      const updatedPost = state.value.findIndex((post) => {
        return post._id === action.payload._Id;
      });
      state.value[updatedPost] = action.payload;
    },

    [api.updatePost.rejected]: (state, action) => {
      state.loading = true;
    },

    // ==================================================

    [api.deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [api.deletePost.fulfilled]: (state, action) => {
      state.loading = true;
      // console.log(action.payload);
      state.value = state.value.filter((post) => {
        return post._id !== action.payload._id;
      });
    },

    // ==================================================

    [api.likePost.pending]: (state, action) => {
      state.loading = true;
    },
    [api.likePost.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action.payload, 'action.payload method from posts.js');
      const updatedPost = state.value.findIndex((post) => {
        return post._id === action.payload._id;
      });
      state.value[updatedPost] = action.payload;
    },

    // ==================================================
    [api.fetchPostsBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [api.fetchPostsBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    [api.fetchPostsBySearch.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default mongoSlice.reducer;

// [api.updatePost.pending]: (state, action) => {
//   state.loading = true;
// },
// [api.updatePost.fulfilled]: (state, action) => {
//   state.loading = false;
//   state.value = state.value.map((values) => {
//     values._id === action.payload._id ? action.payload : values;
//   });
// },
// [api.updatePost.rejected]: (state, action) => {
//   state.loading = true;
// },

// export const fetchReducer = createSlice({
//   name: 'fetch-reducer',
//   initialState: {
//     loading: false,
//     error: null,
//     data: [
//       {
//         id: null,
//         name: null,
//         age: null,
//         address: null,
//         city: null,
//       },
//     ],
//   },
//   reducers: {
//     fetchRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.data = null;
//     },
//     fetchSuccess: (state, action) => {
//       state.loading = false;
//       state.error = null;
//       state.data = [
//         {
//           id: 1,
//           name: 'John Doe',
//           age: 30,
//           address: '123 Main St',
//           city: 'New York',
//         },
//       ];
//     },
//     fetchFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.data = null;
//     },
//   },
// });

// export const { fetchRequest, fetchSuccess, fetchFailure } =
//   fetchReducer.actions;

// export default fetchReducer.reducer;
