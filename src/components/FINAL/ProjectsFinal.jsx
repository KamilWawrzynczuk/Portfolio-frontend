import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import SingleProjectFinal from './SingleProjectFinal';

function ProjectsFinal({ proudOfState, projectsData }) {
  return (
    <div className='section-blue'>
      <section id='projects'>
        <div className='edit-proud'>
          <h2>{proudOfState}</h2>
        </div>

        {projectsData.map((project, index) => (
          <SingleProjectFinal
            key={uuidv4()}
            direction={index % 2 === 0 ? 'reverse' : ''}
            // projectId={project.projects.projectId}
            subtitle={project.projects.subtitle}
            title={project.projects.title}
            description={project.projects.description}
            secondSubtitle={project.projects.secondSubtitle}
            list={project.projects.list}
            image={project.projects.image}
            linkToWebsite={project.projects.linkToWebsite}
            linkValue={project.projects.linkValue}
          />
        ))}
      </section>
    </div>
  );
}

export default ProjectsFinal;
