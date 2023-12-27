import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrendingIcon from '../components/TrendingIcon'
import "./css/HomePage.css"
import Headroom from 'react-headroom';

const HomePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get('tag');
    const [headroomMargin, setHeadroomMargin] = useState('0px');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHeadroomMargin('0px');
      } else {
        setHeadroomMargin('50px'); // Adjust this value as necessary
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []);

      const hobbies = [
        {
          name: 'Photography',
          image: '../src/images/Photography.jpg', 
        },
        {
          name: 'Painting',
          image: '../src/images/painting.jpg', 
        },
        {
          name: 'Writing',
          image: '../src/images/writing.jpg'
        },
        {
          name: 'Graphic Design/Illustration',  
          image: '../src/images/graphic-designer.jpeg'
        },
        {
          name: 'Graffiti',
          image: '../src/images/graffiti.jpeg'
        },
        {
          name: 'sculpting',
          image: '../src/images/Sculpting.jpeg',
        },
        {
          name: '3d modeling',
          image: '../src/images/3D-Modeling.jpg'
        }
    
      ];
    

    useEffect(() => {
        if (tag) {
          // Fetch posts related to the tag
          // Example: fetchPostsByTag(tag);
        } else {
          // Fetch default posts for the homepage
          // Example: fetchDefaultPosts();
        }
      }, [tag]);

      
     
      return (
        <div className='container-homepage'>
          <Headroom style={{ marginTop: headroomMargin }}>
          <div className="container-sections">
          <div className="trending-section">
            <h2>Trending</h2>
            <TrendingIcon />
          </div>
          <div className="user-preferences-section">
            <div className="preferences-section">
            <h2>For You</h2>
            {/* Display posts based on user preferences */}
            {/* Handle post interactions */}
            </div>
          </div>
        </div>
        </Headroom>
        <div className="test">
          {hobbies.map((hobby, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img src={hobby.image} className="card-img-top" alt={hobby.name} />
                <div className="card-body">
                  <h5 className="card-title">#{hobby.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      );
    };

   

export default HomePage;