import React from 'react';

function UserIntroFinal({ greeting, current, header, name, specialty, myRef }) {
  return (
    <section id='intro' ref={myRef}>
      <div className=''>
        <p className='name click-area'>{greeting}</p>
        <span
          type='button'
          aria-label='Click here to header'
          className='name-span click-area'
        >
          {name}
        </span>
        <h2 className='click-area'>{header}</h2>
        <p>{specialty}</p>
        <p>{current}</p>
      </div>
    </section>
  );
}

export default UserIntroFinal;
