import React from 'react';
import { useDencrypt } from 'use-dencrypt-effect';

const GeneralInfo = ({ generalInfo }) => {
  const values = [];
  Object.values(generalInfo).map((item) => {
    values.push(
      `Possible match: ${item.name.toUpperCase()} ${Math.floor(
        item.value * 100
      )}%`
    );
  });

  const DecrGeneralTyper = () => {
    const { result, dencrypt } = useDencrypt();

    React.useEffect(() => {
      let i = 0;

      const action = setInterval(() => {
        dencrypt(values[i]);

        i = i === values.length - 1 ? 0 : i + 1;
      }, 4000);

      return () => clearInterval(action);
    }, []);

    return <p className="p-text">{result}</p>;
  };

  const calculateImageOffSet = () => {
    const imageOffSet = document
      .getElementById('fr-el')
      .getBoundingClientRect();
    return imageOffSet;
  };

  return (
    <div
      className="info-container"
      style={{
        top: 484 + 10,
        left: calculateImageOffSet().left + 32,
      }}
    >
      <DecrGeneralTyper values={values} />
    </div>
  );
};

export default GeneralInfo;
