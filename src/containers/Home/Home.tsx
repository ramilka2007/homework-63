import React, { useCallback, useEffect, useState } from 'react';
import { FullPost, Posts } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import PostsItem from '../../components/PostsItem/PostsItem';

const Home = () => {
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    const response = await axiosApi.get<Posts | null>('/posts.json');
    const postsResponse = response.data;

    try {
      if (postsResponse !== null) {
        const posts: FullPost[] = Object.keys(response.data).map(
          (id: string) => {
            return {
              ...response.data[id],
              id,
            };
          },
        );
        setPosts(posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {posts.length > 0 ? (
            <>
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <PostsItem post={post} key={post.id} />
                ))}
            </>
          ) : (
            <h4>No posts yet</h4>
          )}
        </>
      )}
    </>
  );
};

export default Home;
