import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { FullPost } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const FullPostPage = () => {
  const [post, setPost] = useState<FullPost>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigation = useNavigate();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const response = await axiosApi.get(`/posts/${params.id}.json`);
    const post: FullPost = response.data;

    try {
      if (response.data !== null) {
        setPost(post);
      }
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const deletePost = async () => {
    setIsLoading(true);
    try {
      await axiosApi.delete(`/posts/${params.id}.json`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      navigation('/');
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {post ? (
            <div className="card mb-3 w-50 ms-auto me-auto">
              <div className="mt-3">
                <button
                  className="btn btn-danger me-3"
                  type="button"
                  onClick={deletePost}
                >
                  Delete post
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => navigation(`/posts/${params.id}/edit`)}
                >
                  Edit post
                </button>
              </div>
              <hr />

              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p className="card-text">{post.datetime}</p>
                <p className="card-body">{post.description}</p>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default FullPostPage;
