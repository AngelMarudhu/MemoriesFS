import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

// Routes

// Routes End

// CONTROLLERS

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likeCount,
} from './Controllers/Posts.js';

import { signIn, signUp } from './Controllers/User.js';

const CONNECTION_URL =
  'mongodb+srv://marudhupandiyan:marudhu12345@cluster0.9a9i0ru.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
const PORT = 8000;
const app = express();

app.use(cors());

// DEFAULT WORK OF EXPRESS JS DOESN'T ADD REQ.BODY IN REQ OBJECT, IN ORDER TO THE ADD REQ.BODY IN REQ OBJECT THROUGH MIDDLEWARE, THAT'S THE POWER OF MIDDLEWARE
// MIDDLEWARE CAN BE MANIPULATE REQUEST OBJECT AND RESPONSE OBJECT, WITHOUT MIDDLEWARE YOU CAN'T GET REQ.BODY VALUE IN REQUEST OBJECT.....
app.use(express.json());

//body-parser is a middleware library for handling HTTP request body parsing in Node.js applications. It helps to extract data from the request body in a format that can be easily used by the application, BASED ON USE CASES
// DEFAULT LIMIT IS 100kb
// OFFICIAL A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This will be a Buffer object of the body.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// if you not give path the pathRoutes will be act all requests, that is the default behaiviour of middlewares, so we want to act particular routes that's why we using /paths this /paths append in your localhost url
// THIS IS CALLED MOUNTING MIDDLEWARE IN PARTICULAR PATHS

app.route('/posts').get(getPosts).post(createPost);

app.route('/posts/:id').patch(updatePost).delete(deletePost);

app.route('/posts/:id/likepost').patch(likeCount);

// USERS ENDPOINTS
app.route('/user/signin').post(signIn);
app.route('/user/signup').post(signUp);

// defaultly mongoose return an promises that's why we used the .then() function and the .catch() function
mongoose
  .connect(CONNECTION_URL, {
    // it's usefull for console logging didn't show unwanted errors and it's not mandatory
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connection success');
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
