import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { userProjectsContext } from '../context/UserProjectsContext';
import SingleProject from './Website/ProjectsComponents/SingleProject';
import EditFormProjectsProudOf from './Website/ProjectsComponents/EditFormProjectsProudOf';
import { proudOfContext } from '../context/ProudOfContext';

function Projects() {
  const { userState, dispatchUserState } = useContext(userProjectsContext);
  const [isClicked, setIsClicked] = useState(true);
  const { proudOfState, dispatchProudOfState } = useContext(proudOfContext);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const userId = localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getProudOf', { userId })
        .then((userData) => {
          dispatchProudOfState({
            type: 'UPDATE',
            payload: userData.data.userDataFromDb,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleAddProject() {
    const userId = localStorage.getItem('user_id');
    axios
      .put('https://portfoliocreator.onrender.com/users/addProjectData', {
        userId,
      })
      .then((newProject) => {
        dispatchUserState({
          type: 'ADD',
          payload: [
            {
              projectId: newProject.data.userData.projectId,
              subtitle: newProject.data.userData.subtitle,
              title: newProject.data.userData.title,
              description: newProject.data.userData.description,
              secondSubtitle: newProject.data.userData.secondSubtitle,
              list: newProject.data.userData.list,
              image: newProject.data.userData.image,
              linkToWebsite: newProject.data.userData.linkToWebsite,
              linkValue: newProject.data.userData.linkValue

            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='section-blue'>
      <section id='projects'>
        <div className='edit-proud'>
          <h2>{proudOfState}</h2>
          <button
            onClick={handleClick}
            type='button'
            aria-label='Click here to edit paragraph'
            className='edit-button edit-proud-button'
          >
            Edit
          </button>
          <EditFormProjectsProudOf
            setIsClicked={setIsClicked}
            isClicked={isClicked}
          />
        </div>

        {userState.map((project, index) => (
          <SingleProject
            key={uuidv4()}
            direction={index % 2 === 0 ? 'reverse' : ''}
            projectId={project.projectId}
            subtitle={project.subtitle}
            title={project.title}
            description={project.description}
            secondSubtitle={project.secondSubtitle}
            list={project.list}
            image={ project.image }
            linkToWebsite={ project.linkToWebsite }
            linkValue = {project.linkValue}
          />
        ))}

        <div className='edit-button-div'>
          <button
            onClick={handleAddProject}
            type='button'
            aria-label='Click here to delete project'
            className='edit-button edit-button-add'
          >
            Add project
          </button>
        </div>
      </section>
    </div>
  );
}

export default Projects;
