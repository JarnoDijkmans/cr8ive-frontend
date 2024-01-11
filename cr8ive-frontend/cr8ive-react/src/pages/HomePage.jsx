import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrendingIcon from '../components/TrendingIcon'
import PostService from '../services/PostService';
import LocalStorageService from '../services/LocalStorageService';
import "./css/HomePage.css"
import Headroom from 'react-headroom';
import { useJwt } from 'react-jwt'; 
import Post from '../components/Post'

const HomePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hashTagId = queryParams.get('tag');
    const [headroomMargin, setHeadroomMargin] = useState('0px');
    const [fetchedPosts, setFetchedPosts] = useState([]);
    const [seenPosts, setSeenPosts] = useState([]);
    const token = LocalStorageService.get();
    const { decodedToken} = useJwt(token || null);
    const [currentSection, setCurrentSection] = useState('preferences');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHeadroomMargin('-5px');
      } else {
        setHeadroomMargin('40px'); 
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    useEffect(() => {
      if (decodedToken) {
        const userId = decodedToken.userId;
        if (currentSection == 'preferences'){
          if (hashTagId) {
            // Fetch posts related to the tag
            // Example: fetchPostsByTag(tag);
          } else {
            PostService.getLatestPostsforUser(userId) 
              .then((response) => {
              console.log("response: ", response)
              setFetchedPosts(response);
            })
          }
        }
        else if(currentSection == 'trending') {
          PostService.getTrendingPosts()
          .then((response) => {
            setFetchedPosts(response)
          })
        }
        else { setFetchedPosts([])}
      }}, [hashTagId, decodedToken, currentSection]);

      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                markPostAsSeen(entry.target.id);
                observer.unobserve(document.getElementById(entry.target.id));
              }
            });
          },
          { threshold: 1 } 
        );

        fetchedPosts.forEach((post) => {
          observer.observe(document.getElementById(`post-${post.id}`));
        });
      
        return () => {
          fetchedPosts.forEach((post) => {
            const element = document.getElementById(`post-${post.id}`);
            if (element) {
              observer.unobserve(element);
            }
          });
        };
      }, [fetchedPosts]);

      const handleTrendingClick = () => {
        setCurrentSection('trending');
      };

      const handlePreferencesClick = () => {
        setCurrentSection('preferences');
      };

      const markPostAsSeen = async (postId) => {
        setSeenPosts((prevSeenPosts) => [...prevSeenPosts, postId]);
      
        try {
          await PostService.markPostAsSeenByUser(postId, decodedToken.userId);
        } catch (error) {
          console.error('Error marking post as seen:', error);
        }
      };

      
     
      return (
        <div className='container-homepage'>
          <Headroom style={{ marginTop: headroomMargin }}>
          <div className="container-sections">
            <div className="trending-section" onClick={handleTrendingClick}>
              <h2>Trending</h2>
              <TrendingIcon />
            </div>
            <div className="preferences-section" onClick={handlePreferencesClick}>
              <h2>For You</h2>
            </div>
          </div>
        </Headroom>
        <div className='posts-section'>
        {fetchedPosts.map((post) => (
              <Post key={post.id} post={post} seen={seenPosts.includes(post.id)} />
            ))}
            </div>
        </div>
      );
    };

   

export default HomePage;