import React, { useCallback, useEffect, useState } from 'react';
import { AddPost } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [EditPost, setEditPost] = React.useState<AddPost>({
    title: '',
    description: '',
    datetime: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchEditPost = useCallback(async () => {
    setIsLoading(true);

    const response = await axiosApi.get(`/posts/${params.id}.json`);
    const post = response.data;

    try {
      if (response.data !== null) {
        setEditPost({
          ...post,
          title: post.title,
          description: post.description,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchEditPost();
  }, [fetchEditPost]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const editPost: AddPost = {
      title: EditPost.title,
      description: EditPost.description,
      datetime: EditPost.datetime,
    };

    try {
      await axiosApi.put(`/posts/${params.id}.json`, editPost);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
      navigate('/');
    }

    setEditPost({
      title: '',
      description: '',
    });
  };

  const changeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditPost((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={onFormSubmit}>
          <h2 className="text-center mb-4">Edit your post</h2>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={EditPost.title}
              onChange={changeForm}
            />
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={EditPost.description}
              onChange={changeForm}
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditPost;
