import React from 'react';
import './FaceRecognition.css';
import DetailTypist from '../detailstypist/detailtypist';
import GeneralInfo from '../General_Info/General_Info';
import Celebrity from '../Celebrity/Celebrity';

const FaceRecognition = ({
  box,
  imageUrl,
  showInfo,
  generalInfo,
  celebrity,
}) => {
  return (
    <div className="center mt0">
      <div className="absolute pa4" id="fr-el">
        <img id="image" alt="" src={imageUrl} width="500px" height="auto" />
        {box.topRow ? (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ) : null}
        {showInfo.gender ? (
          <DetailTypist showInfo={showInfo} box={box} imageUrl={imageUrl} />
        ) : null}
        {generalInfo.length > 0 ? (
          <GeneralInfo generalInfo={generalInfo} />
        ) : null}
        {celebrity.length > 0 ? (
          <Celebrity celebrity={celebrity} box={box} />
        ) : null}
      </div>
    </div>
  );
};
export default FaceRecognition;
