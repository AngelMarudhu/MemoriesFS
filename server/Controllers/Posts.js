import { request } from 'express';
import mongoose from 'mongoose';
import postMessageSchema from '../Models/PostSchema.js';

// every controllers has try catch black and some controllers has asynchronous methods.
export const getPosts = async (req, res) => {
  console.log(req.query.page, 'query logging');
  try {
    // why async methos here is when user find some data it will be take some time that's why we want it async
    // find means fetching mongodb datas from mongodb server so initally have empty array in the mongodb
    const posts = await postMessageSchema.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const posts = req.body;

  if (!req.userId) {
    return res.status(404).json({ message: 'You are unauthenticated' });
  }

  const post = new postMessageSchema({
    ...posts,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log(post, 'this the req body');
  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  console.log(_id, 'receiving Id the params');
  if (!req.userId) {
    return res.status(404).json({ message: 'You are unauthenticated' });
  }
  let post = req.body;
  console.log(post, 'recieving request body values');
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(404)
      .json({ message: 'Post Id is Not Found In Your Database' });
  }
  const updatedPost = await postMessageSchema.findByIdAndUpdate(
    _id,
    { ...post, creator: req.userId, createdAt: new Date().toISOString() },
    {
      new: true,
    }
  );
  //  console.log(updatedPost, 'This is the updated Post');
  res.status(200).send(updatedPost);
};

export const deletePost = async (req, res) => {
  const _id = req.params.id;

  console.log(req.userId, 'from auth middleware');

  if (!req.userId) {
    return res.status(404).json({ message: 'You are unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(404)
      .json({ message: 'Post Id is Not Found In Your Database' });
  }
  const deletedPost = await postMessageSchema.findByIdAndDelete(_id);

  res.status(200).send(deletedPost);
};

export const likeCount = async (req, res) => {
  const _id = req.params.id;

  // console.log(req.userId, 'from auth middleware');

  // this measn who like you post means when user logged in they have own email and id first check userid is or not
  if (!req.userId) {
    return res.status(404).json({ message: 'You are unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(404)
      .json({ message: 'Post Id is Not Found In Your Database' });
  }
  const particularPost = await postMessageSchema.findById(_id);
  // this means if you are already like the post checking if your like already in the objects
  // const index = particularPost.likes.findIndex(
  //   (id) => id === String(req.userId)
  // );
  const index = particularPost.likes.findIndex(
    (id) => id === String(req.userId)
  );
  // console.log(index, 'this is index part ');
  if (index === -1) {
    particularPost.likes.push(req.userId);
  } else {
    particularPost.likes = particularPost.likes.filter(
      (id) => id !== String(req.userId)
    );
  }

  const updateLikeCount = await postMessageSchema.findByIdAndUpdate(
    _id,
    particularPost,
    { new: true }
  );

  // console.log(particularPost, 'particularPost');
  // console.log(updateLikeCount, 'updateLikeCount');

  // res.json(updateLikeCount);
  res.status(200).send(updateLikeCount);
};
