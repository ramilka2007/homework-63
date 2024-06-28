import React, { useState } from 'react';
import { AddPost } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const AddPost = () => {
  const navigate = useNavigate();

  const [sendPost, setSendPost] = React.useState<AddPost>({
    title: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const date = () => {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    const post: AddPost = {
      title: sendPost.title,
      description: sendPost.description,
      datetime: date(),
    };

    try {
      await axiosApi.post('/posts.json', post);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
      navigate('/');
    }

    setSendPost({
      title: '',
      description: '',
    });
  };

  const changeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSendPost((prev) => ({
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
          <h2 className="text-center mb-4">Add new post</h2>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={sendPost.title}
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
              value={sendPost.description}
              onChange={changeForm}
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddPost;
