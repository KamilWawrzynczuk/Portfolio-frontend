import React from 'react';

function SingleProjectFinal({
  direction,
  subtitle,
  title,
  description,
  secondSubtitle,
  list,
  image,
  linkToWebsite,
  linkValue
}) {
  
  return (
    <>
      <article className={direction}>
        <div className='text'>
          <h4>{subtitle}</h4>
          <h3>{title}</h3>
          <p className='blackbox'>{description}</p>
          <h4>{secondSubtitle}</h4>
          <p className='list'>{ list }</p>
          <a
            href={`//${linkToWebsite}`}
            className='link-to-project'
            aria-label={`This link leads to project ${title} website`}
          >
            {linkValue}
          </a>
        </div>

        <img src={image} alt={`Screenshot of project ${title}`} />
      </article>
    </>
  );
}

export default SingleProjectFinal;
