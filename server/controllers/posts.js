import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';




export const getPosts = async (req,res) => {
 // res.send('This works!');
 const { page } = req.query;

try{
  const LIMIT = 8;
  const startIndex = (Number(page)-1)*LIMIT;// get the starting index of every page
  const total = await PostMessage.countDocuments({});

   const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);  // find in database will take some time which means that, this is asynchronous action
 // res.status(200).json({message: "getpost is success from server as a response"});
  res.status(200).json({ data: posts,currentPage: Number(page),numberOfPages: Math.ceil(total/LIMIT)});
 // console.log(postMessages);
 // console.log("getposts ")
} catch(error) {
  res.status(404).json({ message: error.message });
  //console.log("hey! there is your error");
}

}

export const getPost = async (req,res) => {

  const { id } = req.params;

  try {      
     const post = await PostMessage.findById(id);

     res.status(200).json(post);
  } catch(error) { 
    res.status(404).json({ message: error.message});
  }

}

// query-> /posts?page=1 -> page=1 
// params -> /posts/123-> id = 123

export const getPostsBySearch = async(req,res) => {
  const { searchQuery,tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');  // 'i' --> test Test all are same
    
    const posts = await PostMessage.find({ $or: [{title},{tags: { $in: tags.split(',')}}]});
      res.json({data : posts});
  } catch (error) {
     res.status(404).json({ message: error.message}); 
  }
}
 
// logic of post creation
export const createPost = async (req,res) =>{
 // res.send('Post creation');
 // need to take from frontend create a from and basic layout for 
 // making a post 
   const post = req.body; // this will give all data that we fill in the form 
    
   const newPostMessage = new PostMessage({ ...post,creator: req.userId, createdAt: new Date().toISOString()});
    try {
  
    await newPostMessage.save(); // data has been added 
    res.status(201).json(newPostMessage); 
    //res.status(201).json({message: "Data added by using createPost",data: "another data added "});
    
   

    } catch (error) {

      res.status(409).json({ message: error.message });

    }
 
}

 //   ---> /posts/123 so this is id<--123
export const updatePost = async (req,res) => {
  const { id: _id } = req.params; // this will give id of that post 
  const post = req.body;  // this is the post that are coming from frontend

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
// update the post with {...post,_id}
  const updatePost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{ new: true });

  res.json(updatePost);
}     
   
export const deletePost = async (req,res) => {
const { id } = req.params;

if(!mongoose.Types.ObjectId.isValid(id))res.status(404).send('No post with that id');

const deletePost = await PostMessage.findByIdAndRemove(id);

res.json({ message:'Post deleted successfully' });

}

export const likePost = async (req,res) => {
     const { id }= req.params;
  
     if(!req.userId) return res.json({ message : 'Unauthonticated'});

     if(!mongoose.Types.ObjectId.isValid(id))res.status(404).send('No post with that id');

     const post = await PostMessage.findById(id);

     const index = post.likes.findIndex((id) => id=== String(req.userId) );
     
     if(index === -1)
     {
      //like the post
      post.likes.push(req.userId);
     }
     else{
      // dislike the post 
     post.likes =  post.likes.filter((id) => id!== String(req.userId)); // return all the likes beside the current person like
     }
     const updatePost = await PostMessage.findByIdAndUpdate(id,post,{ new: true });
     //const updatePost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1},{ new: true });
     res.json(updatePost);
}

export const commentPost = async (req,res) => {
  const { id } = req.params;
  const { value } = req.body; 

  const post = await PostMessage.findById(id); // fetch the post by id from database

  post.comments.push(value);
 
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post, { new: true}); // updating the database so that post contain new comment
  res.json(updatePost);// we can recieve this on frontend
}