import React from 'react';
import Post from './Post/Post';
import useStyles from './stylePosts';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const { value, loading } = useSelector((state) => state.mongos);
  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {value.map((value, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Post value={value} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
