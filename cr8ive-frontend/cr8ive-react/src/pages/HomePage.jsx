import React, { useState, useEffect, useRef } from "react";
import PostService from "../services/PostService";
import PostCard from "../components/PostCard";

function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1); 
  const [postsToShow, setPostsToShow] = useState([]); 
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    fetchAllPosts();
    setupScrollListener();

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const fetchAllPosts = () => {
    setLoading(true);

    PostService.getAllPosts() 
      .then((response) => {
        setAllPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching all posts:', error);
        setLoading(false);
      });
  };

  const setupScrollListener = () => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (observer.current) {
      observer.current.observe(document.querySelector("#observer"));
    }
  };

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      loadMorePosts(); 
    }
  };

  const loadMorePosts = () => {
    const startIndex = (page - 1) * 10; 
    const endIndex = page * 10;

    const nextPostsToShow = allPosts.slice(startIndex, endIndex);

    if (nextPostsToShow.length > 0) {
      setPostsToShow((prevPosts) => [...prevPosts, ...nextPostsToShow]);
      setPage(page + 1);
    }
  };

  return (
    <div>
      <h2>For You Page</h2>
      <div className="post-list">
        {postsToShow.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div id="observer" style={{ height: "10px" }}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default HomePage;