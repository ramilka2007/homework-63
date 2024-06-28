import React, { useCallback, useEffect, useState } from 'react';
import { Post, Posts } from '../../types';
import axiosApi from '../../axiosApi';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = useCallback(async () => {
    const response = await axiosApi.get<Posts | null>('/posts.json');

    const postsResponse = response.data;

    if (postsResponse !== null) {
      const posts: Post[] = Object.keys(response.data).map((id: string) => {
        return {
          ...response.data[id],
          id,
        };
      });
      setPosts(posts);
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);
  return (
    <div>
      {posts
        .slice()
        .reverse()
        .map((post) => {
          return (
            <div key={post.id}>
              <span>Created on: {post.datetime}</span>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <button>Read more</button>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
