import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

function Player() {


      const videoUrl = 'https://bucker-netflix-like-app.s3.us-east-2.amazonaws.com/2024-07-11+21-20-24.mp4';

        const location = useLocation()
        const { playedItem } = location.state || {};

    return (
    <div >
     <ReactPlayer
                url={playedItem.url}
                controls={true}  // Habilita os controles de play/pause, volume, etc.
                playing={false}  // Define como true se quiser que o vídeo comece automaticamente
            />
            <div>ola</div>
    </div>
  );
}

export default Player;
