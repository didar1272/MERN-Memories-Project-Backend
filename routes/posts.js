import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();


router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // patch is used for updating existing documents.
router.delete('/:id', deletePost); // to delete specific post by id
router.patch('/:id/likePost', likePost) // to like and count the number of likes in a post

export default router;