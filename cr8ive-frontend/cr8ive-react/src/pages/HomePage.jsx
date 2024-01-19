import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrendingIcon from '../components/TrendingIcon';
import PostService from '../services/PostService';
import "./css/HomePage.css";
import Headroom from 'react-headroom';
import PostsSection from '../components/PostsSection';

const HomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hashTagId = queryParams.get('tag');

  const categoryID = hashTagId ? hashTagId : null;

  const [headroomMargin, setHeadroomMargin] = useState('0px');
  const [currentSection, setCurrentSection] = useState(categoryID ? 'byCategory' : 'preferences');
  const [currentPage, setCurrentPage] = useState(0);

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

  const fetchMethod = (page) => {
    switch (currentSection) {
      case 'preferences':
        return PostService.getLatestPostsforUser(page);
      case 'trending':
        return PostService.getTrendingPosts(page);
      case 'byCategory':
        return PostService.getPostsByCategory(page, categoryID);
      default:
        return PostService.getLatestPostsforUser(page);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSection]);

  const handleTrendingClick = () => {
    setCurrentSection('trending');
    setCurrentPage(0);
  };

  const handlePreferencesClick = () => {
    setCurrentSection('preferences');
    setCurrentPage(0);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryID])

  return (
    <div className='container-homepage'>
      <Headroom style={{ marginTop: headroomMargin }}>
        <div className="container-sections">
          <div
            id='trending-section-homepage'
            className={`trending-section ${currentSection === 'trending' ? 'selected' : ''}`}
            onClick={handleTrendingClick}
          >
            <h2 style={{ fontSize: currentSection === 'trending' ? '22px' : '14px' }}>Trending</h2>
            <TrendingIcon />
          </div>
          <div
            id='preference-section-homepage'
            className={`preferences-section ${currentSection === 'preferences' ? 'selected' : ''}`}
            onClick={handlePreferencesClick}
          >
            <h2 style={{ fontSize: currentSection === 'preferences' ? '22px' : '14px' }}>For You</h2>
          </div>
        </div>
      </Headroom>
      <PostsSection
        fetchMethod={(page) => fetchMethod(page)}
        currentSection={currentSection}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
