import React, { useEffect, useState, useRef } from 'react';
import Post from './Post';
import LocalStorageService from '../services/LocalStorageService';
import { useJwt } from 'react-jwt';

const PostsSection = ({ fetchMethod, currentSection, currentPage, setCurrentPage }) => {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastPostElementRef = useRef(null);
  const token = LocalStorageService.get();
  const { decodedToken } = useJwt(token || null);
  

  useEffect(() => {
    setIsLoading(true);
    if (decodedToken && fetchMethod) {
      fetchMethod(currentPage)
        .then((response) => {
          setFetchedPosts((prevPosts) => [...prevPosts, ...response]);
          setCurrentPage((prevPage) => prevPage + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        })
    }
  }, [decodedToken, currentSection]);

  useEffect(() => {
    let observer;
  
    if (!isLoading && lastPostElementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            setIsLoading(true); 
            fetchMethod(currentPage)
              .then((response) => {
                if (response.length > 0){
                  setFetchedPosts((prevPosts) => [...prevPosts, ...response]);
                  setCurrentPage((prevPage) => prevPage + 1);
                  setIsLoading(false)
                }
              })
            .catch((error) => {
              console.error('Error fetching posts:', error);
              setIsLoading(false); 
            });
          }
        },
        { threshold: 0.1 }
      );
  
      observer.observe(lastPostElementRef.current);
    }
  
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isLoading, lastPostElementRef]);

  useEffect(() => {
    setFetchedPosts([])
 }, [currentSection]);

  return (
    <div className='posts-section'>
      {fetchedPosts.map((post, index) => {
      const isLastPost = fetchedPosts.length - 1 === index;
      const postRef = isLastPost ? lastPostElementRef : null;

      console.log(`postRef for post with index ${index}:`, postRef, post.description);
        return (
          <Post
            key={post.id}
            ref={postRef}
            post={post}
          />
        )
        })}
      <p>No more posts....</p>
    </div>
  );
};

export default PostsSection;