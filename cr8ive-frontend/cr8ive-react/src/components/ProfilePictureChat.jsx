import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import './styles/ProfilePictureChat.css'

function ProfilePictures({ localUserId, receiverUserId }) {
    const [receiver, setReceiver] = useState(null);
    const [local, setLocalUser] = useState(null);

    useEffect(() => {
        try{
            UserService.getUserById(receiverUserId).then(data => {setReceiver(data)})
            UserService.getUserById(localUserId).then(data => {setLocalUser(data)})
        } catch (error) {
            console.error('Error fetching user:', error);
            return 'Unknown';
        }
    });

   
    return (
      <div className='ProfilePictures-chat'>
        <div className='receiver-profilePicture-left'>
            <img src={receiver && receiver.profilePicture} alt="Receiver User" />
        </div>
        <div className='local-profilePicture-right'>
            <img src={local && local.profilePicture} alt="Local User" />
        </div>
      </div>
    );
  }
  export default ProfilePictures;