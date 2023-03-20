import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Post from "../models/Post.js";
import UserInfo from "../models/UserInfo.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, story } = req.body;
    const imagePath = req.file.filename;
    const user = await UserInfo.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      story,
      profilePicturePath: user.profilePicturePath,
      imagePath,
      comments: [],
    });
    await newPost.save();

    const post = await Post.find({ userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* SEARCH POST */

export const searchPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const searchStr = new RegExp(req.params.searchStr, 'i');
    if(searchStr !== '') {
      const post = await Post.find({ userId: userId, story: searchStr});
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(404).json({message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, story } = req.body;
    const post = await Post.find({ _id: postId});
    if(post[0].userId !== userId)
    {
      res.status(404).json({message: "Unauthorized Access" });
    }
    else
    {
      await Post.findByIdAndUpdate(postId, {story: story});
      const post = await Post.find({ _id: postId});
      res.status(200).json(post);
    }
  }
  catch (err) {
    res.status(404).json({message: err.message });
  }


};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    const post = await Post.find({ _id: postId});

    /* delete post from database */
    await Post.deleteOne({ _id: postId });
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(404).json({message: err.message });
  }

};
