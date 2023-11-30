import React from 'react';

const HeaderBar = (props) => {
  return (
    <div className='headerbar'>
      <h2>
        {' '}
        GIGA
        <span>
          <s> mega </s>
        </span>
        WHATMAP{' '}
      </h2>
    </div>
  );
};

export default HeaderBar;
