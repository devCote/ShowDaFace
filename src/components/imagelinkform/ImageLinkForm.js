import React from 'react';

const ImageLinkForm = ({ onInputChange, onSubmit, onFileUpload, progress }) => {
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
          className="f4 pa2 w-50 br2"
          onChange={onInputChange}
          id="input-link"
        />
        <button
          className="btn f4 w-30 grow link ph3 pv2 dib white bg-purple br2 hover-bg-light-purple"
          onClick={onSubmit}
        >
          Detect
        </button>

        {/* </div> */}
      </div>
      <div className="center mt3" id="upload">
        <input
          style={{ color: '#3f3' }}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={onFileUpload}
        />
      </div>
      <div className="center mt3">
        {progress > 0 ? <span>Loading... Please Wait</span> : null}
        {progress > 0 ? <progress value={progress} max="100" /> : null}
      </div>
    </div>
  );
};

export default ImageLinkForm;
