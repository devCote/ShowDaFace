import React from 'react';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f4" style={{ color: '#3f3', cursor: 'default' }}>
        {"Magic brain will reveal person's info in the picture"}
      </p>
      <p className="f4" style={{ color: '#3f3', cursor: 'default' }}>
        {'Copy and paste image link address or upload your own'}
      </p>
      <div className="center">
        {/* <div className=""> */}
        <input
          type="text"
          placeholder="url://"
          className="f4 pa2 w-40 br2"
          onChange={onInputChange}
          id="input-link"
        />
        <button
          className="btn f4 w-15 grow link ph3 pv2 dib white bg-purple br2 hover-bg-light-purple"
          onClick={onSubmit}
        >
          Detect
        </button>
        <button
          className="btn f4 w-15 grow link ph3 pv2 dib white bg-purple br2"
          onClick={null}
        >
          Upload
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ImageLinkForm;
