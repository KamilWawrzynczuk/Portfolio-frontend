import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';

function EditFormForProject(props) {
  const { userState, dispatchUserState } = useContext(userProjectsContext);

  const currentProject = userState.filter((project) => {
    if (project.projectId === props.projectId) {
      return {
        subtitle: project.subtitle,
        title: project.title,
        description: project.description,
        secondSubtitle: project.secondSubtitle,
        list: project.list,
        image: project.image,
        linkToWebsite: project.linkToWebsite,
        linkValue: project.linkValue,
      };
    }
  });

  const [note, setNote] = useState(...currentProject);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);

    const userId = localStorage.getItem('user_id');
    axios
      .put('https://portfoliocreator.onrender.com/users/addProjectData', {
        data: {
          subtitle:
            note.subtitle.length > 0
              ? note.subtitle
              : currentProject[0].subtitle,
          title: note.title.length > 0 ? note.title : currentProject[0].title,
          description:
            note.description.length > 0
              ? note.description
              : currentProject[0].description,
          secondSubtitle:
            note.secondSubtitle.length > 0
              ? note.secondSubtitle
              : currentProject[0].secondSubtitle,
          list: note.list.length > 0 ? note.list : currentProject[0].list,
          image: currentProject[0].image,
          linkToWebsite:
            note.linkToWebsite.length > 0
              ? note.linkToWebsite
              : currentProject[0].linkToWebsite,
          linkValue:
            note.linkValue.length > 0
              ? note.linkValue
              : currentProject[0].linkValue,
        },
        userId,
        projectId: props.projectId,
      })
      .then((updateProject) => {
        dispatchUserState({
          type: 'EDIT',
          payload: [
            {
              projectId: updateProject.data.userData.projectId,
              subtitle: updateProject.data.userData.subtitle,
              title: updateProject.data.userData.title,
              description: updateProject.data.userData.description,
              secondSubtitle: updateProject.data.userData.secondSubtitle,
              list: updateProject.data.userData.list,
              image: updateProject.data.userData.image,
              linkToWebsite: updateProject.data.userData.linkToWebsite,
              linkValue: updateProject.data.userData.linkValue,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    localStorage.setItem('userProjectsState', JSON.stringify(userState));
  }, []);

  return (
    <div className='create-area create-area-form'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='subtitle'
            onChange={handleChange}
            placeholder={currentProject[0].subtitle}
            rows='1'
          />
          <textarea
            name='title'
            onChange={handleChange}
            placeholder={currentProject[0].title}
            rows='1'
          />
          <textarea
            name='description'
            onChange={handleChange}
            placeholder={currentProject[0].description}
            rows='5'
          />
          <textarea
            name='secondSubtitle'
            onChange={handleChange}
            placeholder={currentProject[0].secondSubtitle}
            rows='1'
          />
          <textarea
            name='list'
            onChange={handleChange}
            placeholder={currentProject[0].list}
            rows='1'
          />
          <textarea
            name='linkValue'
            onChange={handleChange}
            placeholder={currentProject[0].linkValue}
            rows='1'
          />
          <textarea
            name='linkToWebsite'
            onChange={handleChange}
            placeholder={currentProject[0].linkToWebsite}
            rows='1'
          />
          <button className='edit-button' onClick={submitNote}>
            Edit
          </button>
        </form>
      )}
    </div>
  );
}

export default EditFormForProject;
