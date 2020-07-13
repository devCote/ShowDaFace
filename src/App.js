import React, { useState } from 'react';
import { imagesRef } from './firebase/firebase';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Particles from 'react-particles-js';
import {
  faceDetectModel,
  generalModel,
  demographicsModel,
  celebrityModel,
} from './clarifai/clarifai.fetch';

// *** ACTUAL COMPONENT MAIN HOOK FUNC ***

const App = () => {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [showInfo, setShowInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [progress, setProgress] = useState(0);
  const [celebrity, setCelebrity] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [box, setBox] = useState({});

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  React.useEffect(() => {
    const handleResize = () => setBox(calculateFaceLocation(coordinates));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const calculateFaceLocation = (coordinates) => {
    const image = document.getElementById('image');
    const imageRect = image.getBoundingClientRect();
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: coordinates.left_col * width + 32,
      topRow: coordinates.top_row * height + 32,
      rightCol: width - coordinates.right_col * width + 32,
      bottomRow: height - coordinates.bottom_row * height + 32,
      infoBoxLeft:
        coordinates.right_col * width + imageRect.left - imageRect.x + 32,
      infoBoxTop: coordinates.top_row * height + 32,
      celebLeft:
        coordinates.left_col * width + imageRect.left - imageRect.x + 32,
      celebBotom: coordinates.bottom_row * height + 32 + 4,
    };
  };

  const onSubmit = async () => {
    if (!submitRulesCheck(input)) return;
    setImgUrl(input);
    // run func to display face
    const coordinatesFromModel = await faceDetectModel(input);
    setCoordinates(coordinatesFromModel);
    setBox(calculateFaceLocation(coordinatesFromModel));
    setShowInfo(await demographicsModel(input));
    setGeneralInfo(await generalModel(input));
    setCelebrity(await celebrityModel(input));
  };

  // const [width, setWidth] = useState(window.innerWidth);
  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // });

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
          const coordinatesFromModel = await faceDetectModel(bucketImgUrl);
          setCoordinates(coordinatesFromModel);
          setBox(calculateFaceLocation(coordinatesFromModel));
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
      <FaceRecognition
        box={box}
        imageUrl={imgUrl}
        showInfo={showInfo}
        generalInfo={generalInfo}
        celebrity={celebrity}
      />
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
