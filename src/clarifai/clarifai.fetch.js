import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFY_API_KEY,
});

// --- FACEDETECT MODEL ---
export const faceDetectModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.FACE_DETECT_MODEL,
  });
  const predictModel = await initModel.predict(input);
  const coordinatesFromRes = await predictModel.outputs[0].data.regions[0]
    .region_info.bounding_box;

  return calculateFaceLocation(await coordinatesFromRes);
};

// --- DEMOGRAPHICS MODEL ---
export const generalModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.DEMOGRAPHICS_MODEL,
  });
  const predictModel = await initModel.predict(input);
  try {
    const responseData = await predictModel.outputs[0].data.regions[0].data
      .concepts;
    return responseDataProcess(await responseData);
  } catch (err) {
    alert('Error: Human not found');
    window.location.reload();
  }
};

const responseDataProcess = (data) => {
  const age =
    Number(data[0].name) < Number(data[3].name)
      ? [data[0].name, data[3].name]
      : [data[3].name, data[0].name];
  const gender = data[20].name === 'feminine' ? 'female' : 'male';
  const race = data[22].name;
  const person = {
    age1: age[0],
    age2: age[1],
    gender: gender,
    race: race,
  };
  return person;
};

// *** FUNC TO RETURN FACE COORDINATES
const calculateFaceLocation = (coordinates) => {
  const image = document.getElementById('image');
  const imageOffSet = document.getElementById('fr-el').getBoundingClientRect();
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: coordinates.left_col * width + 32,
    topRow: coordinates.top_row * height + 32,
    rightCol: width - coordinates.right_col * width + 32,
    bottomRow: height - coordinates.bottom_row * height + 32,
    infoBoxLeft: imageOffSet.left + coordinates.right_col * width + 32,
    infoBoxTop: coordinates.top_row * height + 32 + 482,
  };
};

// const calculateInfoLocation = (coordinates) => {
//   const image = document.getElementById('image');
//   const width = Number(image.width);
//   const height = Number(image.height);
//   return {
//     topRow: coordinates.top_row * height,
//     leftCol: coordinates.left_col * width,
//   };
// };
