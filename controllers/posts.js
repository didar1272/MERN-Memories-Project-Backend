import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        //console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {

    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message : error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params; // extracting the id of the post to be edited and renaming it to '_id'
    const post = req.body; // This is going to be sent from the frontend.

    if( !mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    // if the id is valid then we update the post by calling the model Postmessage and 
    // a method called findByIdAndUpdate. inside the method we pass the _id as first para
    // then as 2nd para we need to pass the whole updated 'post'. but where are we recieving
    // the data for the updates ?? Ans: we are recieving it from the requested body (req.body) shown above.

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    // This is a asynchronous action so we add 'await' infront of it.
    // 'updatedPost' gives us access to the updated post and the part in the right side of 
    // updatedPost updates the post in the in database.

    res.json(updatedPost); // we are sending over the updated post.

    // After this we to client side to apply the same logic

}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndRemove(id); 
    // since we are only deleting so we dont need any variables
    // using const. we just apply the logic 

    res.json({ message: "Post deleted succesfully "});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}