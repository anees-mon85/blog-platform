"use client";
import { gql, useQuery } from "@apollo/client";
import Header from "@/app/components/Header";
import { useParams } from "next/navigation";

const GET_POST = gql`
  query GetPost($postId: Int!) {
    getPost(postId: $postId) {
      id
      title
      content
      author {
        email
      }
    }
  }
`;

export default function Post() {
  const params = useParams();
  console.log("params", params);
  const postId = params.id;
  console.log("postid", postId);
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId: parseInt(postId) },
  });
  console.log(data);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{data.getPost.title}</h1>
        <p className="text-gray-700">{data.getPost.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          By: {data.getPost.author.email}
        </p>
      </div>
    </div>
  );
}
