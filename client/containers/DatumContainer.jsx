import React from 'react';
import InputContainer from './InputContainer.jsx';
import ChartContainer from './ChartContainer.jsx';

const DatumContainer = (props) => {
  const { index } = props;

  return(
    <div className="datumContainer">
      <InputContainer index={index}/>
      <ChartContainer index={index}/>
    </div>
  );
};


export default DatumContainer;