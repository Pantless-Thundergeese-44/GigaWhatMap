import React from 'react';
import DatumContainer from './DatumContainer.jsx';

const DataContainer = (props) => {
  return (
    <div className='dataContainer'>
      <DatumContainer index='0' />
      <DatumContainer index='1' />
    </div>
  );
};

export default DataContainer;
