import React from 'react';
import { AddPost } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

const SendMessageForm = () => {
  const navigate = useNavigate();
  const [sendPost, setSendPost] = React.useState<AddPost>({
    title: '',
    description: '',
  });

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      navigate('/');
    } catch (error) {
      console.error('Error happened');
      throw error;
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
    <form className="form" onSubmit={onFormSubmit}>
      <input
        required
        name="title"
        id="title"
        onChange={changeForm}
        value={sendPost.title}
      />
      <textarea
        required
        name="description"
        id="description"
        placeholder="Post description"
        onChange={changeForm}
        value={sendPost.description}
      />
      <button type="submit" className="submitBtn">
        Send
      </button>
    </form>
  );
};

export default SendMessageForm;
