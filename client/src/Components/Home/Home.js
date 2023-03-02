import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../apiaxios/index';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  //  const { value } = useSelector((state) => state.mongos);

  // console.log(value);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth='lg'>
      <Grow in>
        <Container>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
