import React from 'react';
import 'react-typist/dist/Typist.css';
import './detailtypist.css';

export default class DetailTypist extends React.Component {
  constructor({ showInfo, box, imageUrl }) {
    super();
    this.state = {
      imageUrl: imageUrl,
      showInfo: showInfo,
      box: {
        infoBoxTop: box.infoBoxTop,
        infoBoxLeft: box.infoBoxLeft,
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.imageUrl !== nextProps.imageUrl) {
      this.setState({ showInfo: nextProps.showInfo });
      this.setState({
        box: {
          infoBoxTop: nextProps.box.infoBoxTop,
          infoBoxLeft: nextProps.box.infoBoxLeft,
        },
      });
      // console.log(nextProps.showInfo);
    }
  }

  capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  render() {
    // console.log(this.infoBox);
    return (
      <div
        className="info-container"
        style={{
          top: this.state.box.infoBoxTop,
          left: this.state.box.infoBoxLeft,
        }}
      >
        <div className="info-box">
          <span className="sp-info f5">
            Object: {this.capitalizeFirstLetter(this.state.showInfo.gender)}{' '}
            human
          </span>
          <br />
          <span className="sp-info f5">
            Origin: {this.capitalizeFirstLetter(this.state.showInfo.race)}
          </span>
          <br />
          <span className="sp-info f5">
            Age: {this.state.showInfo.age1}-{this.state.showInfo.age2} years old
          </span>
        </div>
      </div>
    );
  }
}
