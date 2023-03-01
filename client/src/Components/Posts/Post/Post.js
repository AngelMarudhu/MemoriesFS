import React from 'react';
import useStyles from './stylePost';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../apiaxios';
import { likePost } from '../../../apiaxios';

const Post = ({ value, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={value.selectedFile}
        title={value.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{value.creator}</Typography>
        <Typography variant='body2'>
          {' '}
          {moment(value.createdAt).fromNow()}{' '}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={() => {
            setCurrentId(value._id);
          }}
        >
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {value.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h5'
        component='h2'
      >
        {value.title}
      </Typography>

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {value.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            dispatch(likePost({ id: value._id }));
          }}
        >
          <ThumbUpAltIcon fontSize='small' /> Like {value.likeCount}
        </Button>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            dispatch(deletePost({ id: value._id }));
          }}
        >
          <DeleteIcon fontSize='small' /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
