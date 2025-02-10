"use client";
import React from "react";
import SearchBar from "./SearchBar";
import { gql, useQuery } from "@apollo/client";
import PostCard from "./PostCard";

const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int) {
    getPosts(page: $page, limit: $limit) {
      id
      title
      content
      author {
        email
      }
    }
  }
`;

const PostList = () => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: 10 },
  });

  const handleSearch = (keyword: string) => {
    refetch({ keyword });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      {data.getPosts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
