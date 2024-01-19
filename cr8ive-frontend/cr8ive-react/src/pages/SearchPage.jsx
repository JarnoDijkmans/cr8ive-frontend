import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/SearchPage.css';
import LocalStorageService from '../services/LocalStorageService';

function SearchPage() {

  useEffect(() => {
    LocalStorageService.AccessTokenisExpired()
  });

  const tags = [
    {
      id: 1,
      name: 'Photography',
      image: '../src/images/Photography.jpg', 
    },
    {
      id: 2,
      name: 'Painting',
      image: '../src/images/painting.jpg', 
    },
    {
      id: 3,
      name: 'Writing',
      image: '../src/images/writing.jpg'
    },
    {
      id: 4,
      name: 'Graphic Design/Illustration',  
      image: '../src/images/graphic-designer.jpeg'
    },
    {
      id: 5,
      name: 'Graffiti',
      image: '../src/images/graffiti.jpeg'
    },
    {
      id: 6,
      name: 'Sculpting',
      image: '../src/images/Sculpting.jpeg',
    },
    {
      id: 7,
      name: '3D Modeling',
      image: '../src/images/3D-Modeling.jpg'
    }

  ];


    return (
      <div>
        <div className="row">
          {tags.map((tag, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Link 
                to={`/home?tag=${tag.id}`} className="card">
                <img src={tag.image} className="card-img-top" alt={tag.name} />
                <div className="card-body">
                  <h3 className="card-title">#{tag.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchPage;