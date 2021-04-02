import express from 'express';

import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js";

const router = express.Router();


router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // patch is used for updating existing documents.
router.delete('/:id', deletePost); // to delete specific post by id

export default router;