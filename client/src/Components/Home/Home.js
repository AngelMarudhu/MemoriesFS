import React, { useState, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Paper,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../apiaxios/index';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import {} from 'react-query';
import Paginate from '../Pagination/Paginate';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import homestyles from './homestyles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = homestyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.mongos);
  const query = useQuery();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');
  console.log(search);
  //  const { value } = useSelector((state) => state.mongos);
  console.log(value);

  const handleKeyPress = (e) => {};

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (deleteTag) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
  };

  // The reason for this is that dispatch is a function that comes from the useDispatch hook provided by Redux, and it can change between renders. If you don't include it in the dependency array, the callback function will be created with the original dispatch function from the first render, and it won't have access to any updated version of dispatch. By including it in the dependency array, you ensure that the callback function always has access to the latest version of dispatch
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
            <Grid item xs={12} sm={7} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position='static'
                color='inherit'
              >
                <TextField
                  name='search'
                  variant='outlined'
                  label='search Memories'
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                ></TextField>
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label='Search Tags'
                  variant='outlined'
                />
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paginate />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
