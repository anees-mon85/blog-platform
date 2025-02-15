"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface PostFormProps {
  onSubmit: (data: PostInput) => void;
  initialData?: PostInput;
}

export interface PostInput {
  title: string;
  content: string;
  category: string;
}

const categories = ["Technology", "Health", "Finance", "Education"]; // Example categories

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>({
    defaultValues: initialData,
  });

  const onFormSubmit: SubmitHandler<PostInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4 p-4 max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 20,
              message: "Content must be at least 20 characters",
            },
          })}
          rows={5}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.content ? "border-red-500" : ""
          }`}
        />
        {errors.content && (
          <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.category ? "border-red-500" : ""
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
