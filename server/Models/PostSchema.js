import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessageSchema = mongoose.model('Post', postSchema);
export default postMessageSchema;
