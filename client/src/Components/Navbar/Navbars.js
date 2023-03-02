import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './stylenavbar';
import memories from '../../images/memories.png';
import { Toolbar, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navbars = () => {
  const classes = useStyles();
  const user = null;

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant='h2' align='center'>
          Marudhu Memories
        </Typography>
        <img className={classes.image} src={memories} alt='icon' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div>
            <Avatar
              className={classes.avatar}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.chatAt(0)}
            </Avatar>
            <Typography
              className={classes.userName}
              variant='h6'
              align='center'
            >
              {user.result.name}
            </Typography>
            <Button variant='contained' className={classes.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to='/auth'
              variant='contained'
              color='primary'
            >
              SignIn
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbars;
