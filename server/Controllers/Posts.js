import mongoose from 'mongoose';
import postMessageSchema from '../Models/PostSchema.js';

// every controllers has try catch black and some controllers has asynchronous methods.
export const getPosts = async (req, res) => {
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
  const post = new postMessageSchema(req.body);
  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  //console.log(_id, 'receiving Id the params');
  // console.log(req);
  let post = req.body;
  //console.log(post, 'recieving request body values');
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(404)
      .json({ message: 'Post Id is Not Found In Your Database' });
  }
  const updatedPost = await postMessageSchema.findByIdAndUpdate(_id, post, {
    new: true,
  });
  //console.log(updatedPost, 'This is the updated Post');
  res.status(200).send(updatedPost);
};

export const deletePost = async (req, res) => {
  const _id = req.params.id;
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
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(404)
      .json({ message: 'Post Id is Not Found In Your Database' });
  }
  const particularPost = await postMessageSchema.findById(_id);
  const updateLikeCount = await postMessageSchema.findByIdAndUpdate(
    _id,
    {
      likeCount: particularPost.likeCount + 1,
    },
    { new: true }
  );

  console.log(particularPost, 'particularPost');
  console.log(updateLikeCount, 'updateLikeCount');

  res.status(200).send(updateLikeCount);
};
