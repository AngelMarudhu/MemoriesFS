import React, { useEffect, useState } from 'react';
import useStyles from './styleForm';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../apiaxios/index.js';
import { updatePost } from '../../apiaxios/index.js';
//import axios from 'axios';

const Form = ({ currentId, setCurrentId }) => {
  // why because every input data file store in this useState value that's why using this
  const [postData, setPostData] = useState({
    title: ' ',
    content: ' ',
    tags: ' ',
    selectedFile: ' ',
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  // we dont want all post we want only particular post so we have to fine the id and that posts
  let post = useSelector((state) =>
    currentId ? state.mongos.value.find((p) => p._id === currentId) : null
  );

  // value la edhavadhu change nadantha mattum setpostdata call aagum, values are populated in the input fields
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(currentId, postData, 'updated');
    if (currentId) {
      await dispatch(
        updatePost({
          id: currentId,
          postDatas: postData,
          name: user?.result?.name,
        })
      );
      clear();
    } else {
      await dispatch(addPost({ ...postData, name: user?.result?.name }));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      content: '',
      tags: '',
    });
  };
  const classes = useStyles();

  if (!user?.result) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Hey Buddies Please Sign In After Create Your Memorable Memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant='h6'></Typography>
        {/* <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            // ...post data all data will be the same but we only change creator propery so we using spread operator
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          multiline
          rows={4}
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma separated)'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
        {/* <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={summa}
        >
          Summa
        </Button> */}
      </form>
    </Paper>
  );
};

export default Form;
