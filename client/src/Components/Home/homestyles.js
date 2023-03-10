import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '1rem',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '1rem',
  },

  Button: {
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      color: 'black',
      backgroundColor: 'green',
      transition: '0.5s',
    },
  },

  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
