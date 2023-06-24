import React from 'react';
import './faceRecognition.css';

const FaceRecognition = ({ imageURL, boundingBoxes }) => {
  // TODO remove temp test
  console.log(boundingBoxes);
  boundingBoxes[0] = {
    topRow: 120,
    rightCol: 120,
    bottomRow: 130,
    leftCol: 130
  }

  return (
    <div className='flex justify-center mt4'>
      <div className='absolute '>
        {
          // If image not assigned, render nothing
          imageURL === '' ? '' :
            <img
              id='inputImage'
              alt='Face Detection'
              src={imageURL}
              width='500px'
              height='auto' />
        }
        {
          // If bounding boxes not found, render nothing
          boundingBoxes.length === 0 ? '' :
            <div
              className='bounding-box'
              style={{
                top: boundingBoxes[0].topRow,
                right: boundingBoxes[0].rightCol,
                bottom: boundingBoxes[0].bottomRow,
                left: boundingBoxes[0].leftCol
              }} />
        }
      </div>
    </div>
  );
}

export default FaceRecognition;