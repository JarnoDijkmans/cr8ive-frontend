import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostList from '../components/PostList';
import UserService from "../services/UserService";
import ChatPage from "./ChatPage";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { userId } = useParams();
  const [IsChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
      let user;
      if (location.state && location.state.user) {
        user = location.state.user;
      } else {
        user = UserService.getUserById(userId);
      }
      setUser(user);
  }, [userId, location.state]);

  useEffect(() => {
    if (IsChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [IsChatOpen]);
 
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChatClick = () => {
    setIsChatOpen(true);
  }

  const handleModalClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="profile-user">
      <div className="image-container">
            <img src="../src/images/background-profile.png" className="background-picture" alt="Background image" />
            <div className="eye"></div>
            <img src={user.profilePicture} className="profile-picture" alt={user.firstName} />
          </div>
          <h2>{user.firstName}{user.lastName}</h2>
          <button onClick={() => handleChatClick()}>Start Chat</button>
      <PostList userId={user.id} />
      {IsChatOpen && <ChatPage receiverUserName={user.firstName} receiverId={user.id} onClose={handleModalClose} />}
    </div>
  );
}

export default ProfilePage;