import { useEffect } from 'react';
import './css/SearchPage.css'
import LocalStorageService from '../services/LocalStorageService';

function SearchPage() {
  useEffect(() => {
    LocalStorageService.AccessTokenisExpired()
  });

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




    return (
      <div>
        <div className="row">
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
}

export default SearchPage;