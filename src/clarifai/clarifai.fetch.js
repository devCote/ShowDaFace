import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFY_API_KEY,
});

// --- FACEDETECT MODEL ---
export const faceDetectModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.FACE_DETECT_MODEL,
  });
  try {
    const predictModel = await initModel.predict(input);
    const coordinatesFromRes =
      predictModel.outputs[0].data.regions[0].region_info.bounding_box;
    return coordinatesFromRes;
  } catch (err) {
    alert('FACEDETECT undefined', err);
    return {};
  }
};

// --- DEMOGRAPHICS MODEL ---
export const demographicsModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.DEMOGRAPHICS_MODEL,
  });
  try {
    const predictModel = await initModel.predict(input);
    const responseData = predictModel.outputs[0].data.regions[0].data.concepts;
    return responseDataProcess(await responseData);
  } catch (err) {
    alert('DEMOGRAPHICS undefined', err);
    return {};
  }
};

// ___ GENERAL MODEL ____
export const generalModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.GENERAL_MODEL,
  });
  try {
    const predictModel = await initModel.predict(input);
    const responseData = predictModel.outputs[0].data.concepts;
    return responseData;
  } catch (err) {
    alert('GENERAL DATA undefined', err);
    return {};
  }
};

// --- CELEBRITY MODEL ---
export const celebrityModel = async (input) => {
  const initModel = await app.models.initModel({
    id: Clarifai.CELEBRITY_MODEL,
  });
  try {
    const predictModel = await initModel.predict(input);
    const responseData = predictModel.outputs[0].data.regions[0].data.concepts;
    return responseData;
  } catch (err) {
    alert('CELEBRITY undefined', err);
    return {};
  }
};

const responseDataProcess = (data) => {
  const age =
    Number(data[0].name) < Number(data[3].name)
      ? [data[0].name, data[3].name]
      : [data[3].name, data[0].name];
  const gender = data[20].name === 'feminine' ? 'female' : 'male';
  let race;
  if (data[22].name === 'hispanic, latino, or spanish origin') {
    race = 'Latino or spanish';
  } else {
    race = data[22].name;
  }
  const person = {
    age1: age[0],
    age2: age[1],
    gender: gender,
    race: race,
  };
  return person;
};

// *** FUNC TO RETURN FACE COORDINATES

// const calculateInfoLocation = (coordinates) => {
//   const image = document.getElementById('image');
//   const width = Number(image.width);
//   const height = Number(image.height);
//   return {
//     topRow: coordinates.top_row * height,
//     leftCol: coordinates.left_col * width,
//   };
// };
