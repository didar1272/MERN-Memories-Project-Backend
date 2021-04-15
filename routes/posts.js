import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); // patch is used for updating existing documents.
router.delete('/:id', auth, deletePost); // to delete specific post by id
router.patch('/:id/likePost', auth, likePost); // to like and count the number of likes in a post

export default router;