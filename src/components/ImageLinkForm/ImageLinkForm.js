import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className='mw5 mw7-ns center tc'>
      <p className='f3 black'>
        Enter image URL to detect faces
      </p>
      <div className='pa3 ph4-ns pv4-ns br4 carbon'>
        <div className='flex dib'>
          <input
            onChange={onInputChange}
            className='f4 w-70 mr2 br2'
            type='text' />
          <button
            onClick={onSubmit}
            className='w-30 f4 pv2 br2 black bg-washed-green hover-bg-light-blue pointer'>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;