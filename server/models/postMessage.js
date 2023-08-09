import mongoose from 'mongoose';
//const mongoose = require("mongoose");
// here we are defining schema of data
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String],default: []},
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);
// if collection name with PostMessage is already present the while creating message it will insert data into that 
// if collection is not present with name PostMessage then it will create a collection and then add data into it
 
// using base64 we going to convert the image into string 
// here we are creating mogoose model using mongoose schema  later on on that model we are going to run command find,create,delete,update

export default PostMessage;