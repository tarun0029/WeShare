import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';



import { useHistory } from 'react-router-dom';

 
import { deletePost,likePost} from '../../../actions/posts';
import useStyles from './styles';
import { useDispatch } from 'react-redux';





const Post = ({ post, setCurrentId }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile')); 
  const history = useHistory();
  const [likes,setLikes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost =  likes.find((like) => like===(userId));

  const handleLike= () => {
    dispatch(likePost(post._id));
   if(hasLikedPost)
   {
     setLikes(likes.filter((id) => id!==(userId)));
   }
   else{
      setLikes([...likes,userId]);
   }
  }

const Likes = () => {
  if(likes.length > 0){
    return likes.find((like) => like===userId)
    ?(
       <><ThumbUpAltIcon fontSize="small" />&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`} </>
    ): (
      <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length ===1 ? 'Like' : 'Likes' } </>
    );  
  }
  return <><ThumbUpAltOutlinedIcon fontSize= "small" />&nbsp;Like</>
};

const openPost = () => history.push(`/posts/${post._id}`);  

  return (
    <Card className={classes.card} raised elevation={6} >
      <ButtonBase className={classes.cardAction} onClick={openPost} >
      
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) && (
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div> )}   
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      
      </ButtonBase >
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled = {!user?.result} onClick={handleLike}>
          <Likes /> </Button>
          {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) && (

            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
          )  
          }
      </CardActions>
    </Card>
  );
};

export default Post;