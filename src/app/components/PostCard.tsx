import Link from "next/link";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: {
      email: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500">By: {post.author.email}</p>
      <Link
        href={`/posts/${post.id}`}
        className="text-blue-500 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
}
