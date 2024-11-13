import React from 'react';
import ReactPlayer from 'react-player';

function MyList() {


      const videoUrl = 'https://bucker-netflix-like-app.s3.us-east-2.amazonaws.com/2024-07-11+21-20-24.mp4';

  
    return (
    <div > teste
     <ReactPlayer
                url={videoUrl}
                controls={true}  // Habilita os controles de play/pause, volume, etc.
                width="50%"
                height="50%"
                playing={false}  // Define como true se quiser que o vídeo comece automaticamente
            />
    </div>
  );
}

export default MyList;
