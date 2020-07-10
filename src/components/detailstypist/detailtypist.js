import React from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import './detailtypist.css';

export default class DetailTypist extends React.Component {
  constructor(showInfo) {
    super();
    this.showInfo = showInfo.showInfo;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <Typist className="Typist MyTypist">
        <span className="sp-info">
          Object: {this.capitalizeFirstLetter(this.showInfo.gender)} human
        </span>
        <br />
        <Typist.Delay ms={500} />
        <span className="sp-info">
          Origin: {this.capitalizeFirstLetter(this.showInfo.race)}
        </span>
        <br />
        <Typist.Delay ms={500} />
        <span className="sp-info">
          Age: {this.showInfo.age1}-{this.showInfo.age2} years old
        </span>
      </Typist>
    );
  }
}
