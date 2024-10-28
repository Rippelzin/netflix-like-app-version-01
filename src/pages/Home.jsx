import React from 'react';
import Slider from "../components/Slider"

const Home = () => {

    const filmesSeries = [
        {
          name: "Inception",
          description: "A thief who invades dreams must perform one last job, planting an idea in a CEO's mind.",
          duration: "2h 28min",
          ageRating: "14+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "Stranger Things",
          description: "A group of friends discovers supernatural mysteries in their small town after a boy's disappearance.",
          duration: "4 seasons",
          ageRating: "16+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "Breaking Bad",
          description: "A high school chemistry teacher starts making methamphetamine to support his family after being diagnosed with cancer.",
          duration: "5 seasons",
          ageRating: "18+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "The Lord of the Rings: The Fellowship of the Ring",
          description: "A group of heroes tries to destroy a magical ring and defeat a dark lord threatening Middle-earth.",
          duration: "2h 58min",
          ageRating: "12+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "WandaVision",
          description: "Wanda Maximoff and Vision live an ideal suburban life, but gradually realize that not everything is as it seems.",
          duration: "9 episodes",
          ageRating: "12+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "Inception",
          description: "A thief who invades dreams must perform one last job, planting an idea in a CEO's mind.",
          duration: "2h 28min",
          ageRating: "14+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "Stranger Things",
          description: "A group of friends discovers supernatural mysteries in their small town after a boy's disappearance.",
          duration: "4 seasons",
          ageRating: "16+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "Breaking Bad",
          description: "A high school chemistry teacher starts making methamphetamine to support his family after being diagnosed with cancer.",
          duration: "5 seasons",
          ageRating: "18+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "The Lord of the Rings: The Fellowship of the Ring",
          description: "A group of heroes tries to destroy a magical ring and defeat a dark lord threatening Middle-earth.",
          duration: "2h 58min",
          ageRating: "12+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        },
        {
          name: "WandaVision",
          description: "Wanda Maximoff and Vision live an ideal suburban life, but gradually realize that not everything is as it seems.",
          duration: "9 episodes",
          ageRating: "12+",
          image: "https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/18931/18-filmes-com-fotografia-incriacutevel-que-todo-fotoacutegrafo-deve-ver_sr-dos-anel.jpg"
        }
    ];
    
  return (
    <div>
       <Slider filmesSeries={filmesSeries}/>
    </div>
  )
};

export default Home;
