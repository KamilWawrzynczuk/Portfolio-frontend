import React from 'react';
import Intro from '../components/Intro';
import Line from '../components/Line';
import Projects from '../components/Projects';
import Contact from '../components/Website/Contact/Contact';

function UserWebsite() {
  return (
    <>
      <Intro />
      <Line />
      <Projects />
      <Line />
      <Contact />
      <Line />
    </>
  );
}

export default UserWebsite;
