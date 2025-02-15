"use client";
import React from "react";
import PostForm, { PostInput } from "@/app/components/PostForm";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
    }
  }
`;

const CreatePostPage: React.FC = () => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const handleCreatePost = async (data: PostInput) => {
    const { title, content } = data;
    const token = localStorage.getItem("token");
    console.log("token", token);
    createPost({
      variables: { title, content },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostForm onSubmit={handleCreatePost} />
    </div>
  );
};

export default CreatePostPage;
