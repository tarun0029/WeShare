import express from 'express';
import {getPostsBySearch,getPost, getPosts,createPost,updatePost,commentPost,deletePost,likePost} from '../controllers/posts.js' // don't frorget to say posts.js

import auth from '../middleware/auth.js';
const router = express.Router();

 
// Note that we can create the logic of these router but this makes our code more difficult to understand that's why we write logic
// of these routes in another file '../contollers/posts.js' 
// as we increase more routes how clean code look like  and then execute the function in another file

router.get('/search',getPostsBySearch );
router.get('/',getPosts);
router.get('/:id',getPost);  // :id --> this means this is going to be an dynamic id
    
router.post('/',auth,createPost);  
router.patch('/:id',auth,updatePost);//use for update things in existing doucment it is dynamic because use need to know the id of post
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost);
 

export default router;