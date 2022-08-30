import PropTypes from 'prop-types';
import React from 'react';
import './RecipeVideo.css';

const RecipeVideo = ({ src, name }) => (
  <div className="RecipeVideo">
    <h3>Video</h3>
    <iframe
      data-testid="video"
      src={ `https://www.youtube.com/embed/${src}` }
      frameBorder="0"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      title={ `${name} recipe video` }
    />
  </div>
);

RecipeVideo.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default RecipeVideo;
