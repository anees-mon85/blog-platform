"use client";
import PostForm, { PostInput } from "../../components/PostForm";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

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

const EditPostPage: React.FC = () => {
  const params = useParams();
  const postId = params.id;

  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      postId: parseInt(postId),
    },
  });

  const handleUpdatePost = async (data: PostInput) => {
    // call edit post mutation here!
    console.log("Update post");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm onSubmit={handleUpdatePost} initialData={{ ...data.getPost }} />
    </div>
  );
};

export default EditPostPage;
