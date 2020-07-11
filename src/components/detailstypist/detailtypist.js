import React from 'react';
import './detailtypist.css';

const DetailTypist = ({ showInfo, box }) => {
  return (
    <div
      className="info-container"
      style={{
        top: box.infoBoxTop,
        left: box.infoBoxLeft,
      }}
    >
      <div className="info-box">
        <span className="sp-info f5">
          Object: {capitalizeFirstLetter(showInfo.gender)} human
        </span>
        <br />
        <span className="sp-info f5">
          Origin: {capitalizeFirstLetter(showInfo.race)}
        </span>
        <br />
        <span className="sp-info f5">
          Age: {showInfo.age1}-{showInfo.age2} years old
        </span>
      </div>
    </div>
  );
};

export default DetailTypist;

const capitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
