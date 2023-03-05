import React, { useState, useEffect } from 'react';
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './stylenavbar';
import memories from '../../images/memories.png';
import { Toolbar, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { logout } from '../../Redux/reducers/auth';

const Navbars = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));
    if (storedUser?.result?.name) {
      setUser(storedUser);
    }
  }, [location]);

  // YOU CAN USE THIS METHOD ALSO
  // useEffect(() => {

  //   setUser((prevUser) => {
  //     const storedUser = JSON.parse(localStorage.getItem('profile'));
  //     if (storedUser?.result) {
  //       return storedUser;
  //     } else {
  //       return prevUser;
  //     }
  //   });
  // }, [location]);

  const logout = () => {
    localStorage.removeItem('profile');
    setUser(null);
    navigate('/auth');
  };

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
          <>
            <Avatar
              className={classes.avatar}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              className={classes.userName}
              variant='h6'
              align='center'
            >
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </>
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
