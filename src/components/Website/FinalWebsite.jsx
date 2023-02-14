import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContactFinal from '../FINAL/ContactFinal';
import FooterFinal from '../FINAL/FooterFinal';
import HeaderFinal from '../FINAL/HeaderFinal';
import ProjectsFinal from '../FINAL/ProjectsFinal';
import UserIntroFinal from '../FINAL/UserIntroFinal';
import Line from '../Line';

function FinalWebsite() {
  const path = useLocation();

  const startIndex = path.pathname.indexOf('/portfolio/');
  const userId = path.pathname.substring(startIndex + 11);

  const [user, setUser] = useState({
    contactData: '',
    introData: '',
    projectsData: '',
    proudOfData: '',
    userInfo: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://portfoliocreator.onrender.com/users/getAllData/${userId}`)
      .then((respond) => {
        setUser({
          contactData: respond.data.userData.contactData[0],
          introData: respond.data.userData.introData[0],
          projectsData: respond.data.userData.projectsData,
          proudOfData: respond.data.userData.proudOfData[0],
          userInfo: respond.data.userData.user,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <HeaderFinal
            github={user.userInfo.github}
            linkedIn={user.userInfo.linkedIn}
            lName={user.userInfo.lName}
            fName={user.userInfo.fName}
            userId={userId}
            websiteTitle={user.userInfo.websiteTitle}
          />
          <UserIntroFinal
            greeting={user.introData.intro.greeting}
            current={user.introData.intro.current}
            header={user.introData.intro.header}
            name={user.introData.intro.name}
            specialty={user.introData.intro.specialty}
          />
          <Line />
          <ProjectsFinal
            proudOfState={user.proudOfData.proudOf}
            projectsData={user.projectsData}
          />
          <Line />
          <ContactFinal
            contact={user.contactData.contact}
            contactInfo={user.contactData.contactInfo}
            email={user.userInfo.email}
          />
          <Line />
          <FooterFinal
            email={user.userInfo.email}
            github={user.userInfo.github}
            linkedIn={user.userInfo.linkedIn}
            lName={user.userInfo.lName}
            fName={user.userInfo.fName}
            websiteTitle={user.userInfo.websiteTitle}
          />
        </>
      )}
    </>
  );
}

export default FinalWebsite;
