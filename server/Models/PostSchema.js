import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessageSchema = mongoose.model('Post', postSchema);
export default postMessageSchema;
