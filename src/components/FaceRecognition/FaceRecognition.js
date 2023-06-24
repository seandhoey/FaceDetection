import React from 'react';

const FaceRecognition = ({ successURL }) => {
  if (successURL === '') {
    return <div />;
  }

  return (
    <div className='flex justify-center mt4'>
      <div className='absolute '>
        <img alt='Face Detection' src={successURL} width='500px' height='auto'/>
      </div>
    </div>
  );
}

export default FaceRecognition;