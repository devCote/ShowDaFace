import React, { useState } from 'react';
import { imagesRef } from './firebase/firebase';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import DetailTypist from './components/detailstypist/detailtypist';
import Particles from 'react-particles-js';
import {
  faceDetectModel,
  generalModel,
  demographicsModel,
  celebrityModel,
} from './clarifai/clarifai.fetch';
import GeneralInfo from './components/General_Info/General_Info';
import Celebrity from './components/Celebrity/Celebrity';

// *** ACTUAL COMPONENT MAIN HOOK FUNC ***

const App = () => {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [box, setBox] = useState({});
  const [showInfo, setShowInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [progress, setProgress] = useState(0);
  const [celebrity, setCelebrity] = useState({});

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = async () => {
    if (!submitRulesCheck(input)) return;
    setImgUrl(input);
    // run func to display face
    setBox(await faceDetectModel(input));
    setShowInfo(await demographicsModel(input));
    setGeneralInfo(await generalModel(input));
    setCelebrity(await celebrityModel(input));
  };

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadTask = imagesRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const bucketImgUrl = await imagesRef.getDownloadURL();
          setImgUrl(bucketImgUrl);
          setBox(await faceDetectModel(bucketImgUrl));
          setShowInfo(await demographicsModel(bucketImgUrl));
          setGeneralInfo(await generalModel(bucketImgUrl));
          setCelebrity(await celebrityModel(bucketImgUrl));
          setProgress(0);
        }
      );
    }
  };

  const handleInputRulesBrake = () => {
    const input = document.getElementById('input-link');
    input.setCustomValidity('URL YOU HAVE PROVIDED IS INVALID');
    input.reportValidity();
    setInput(null);
    input.value = '';
    return false;
  };

  function submitRulesCheck(string) {
    try {
      new URL(string);
    } catch (_) {
      return handleInputRulesBrake();
    }
    if (!string || string.trim().length === 0) {
      return handleInputRulesBrake();
    } else return true;
  }
  return (
    <div className="App tc white">
      <Particles params={particles} className="particles" />
      <Navigation />
      <Logo />
      <ImageLinkForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onFileUpload={onFileUpload}
        progress={progress}
      />
      <FaceRecognition box={box} imageUrl={imgUrl} />
      {showInfo.age1 ? (
        <DetailTypist showInfo={showInfo} box={box} imageUrl={imgUrl} />
      ) : null}
      {generalInfo.length > 0 ? (
        <GeneralInfo generalInfo={generalInfo} />
      ) : null}
      {celebrity.length > 0 ? (
        <Celebrity celebrity={celebrity} box={box} />
      ) : null}
    </div>
  );
};

// *** MAIN APP EXPORT

export default App;

// *** RENDER BACKGROUND PARTICLES SETUP

const particles = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: '#33ff33',
    line_linked: {
      color: '#33ff33',
    },
  },
};
