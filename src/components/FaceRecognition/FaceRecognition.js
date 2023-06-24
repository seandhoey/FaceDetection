import React from 'react';
import './faceRecognition.css';

const FaceRecognition = ({ imageURL, boundingBoxes }) => {
  return (
    <div className='flex justify-center mt4'>
      <div className='absolute '>
        {
          // If image not assigned, render nothing
          imageURL === '' ? <div /> :
            <img
              id='inputImage'
              alt='Face Detection'
              src={imageURL}
              width='500px'
              height='auto' />
        }
        {
          <div>
            {/* Draw each bounding box that exists */}
            {boundingBoxes.length === 0 ? <div /> :
              boundingBoxes.map((box, i) => {
                return (<div
                  key={i}
                  className='bounding-box'
                  style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} />
                );
              })}
          </div>
        }
      </div>
    </div>
  );
}

export default FaceRecognition;