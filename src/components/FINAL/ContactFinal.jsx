import React from 'react';

function ContactFinal({ contact, contactInfo, email }) {
  return (
    <div className='section-plum'>
      <section id='contact'>
        <div>
          <h2>{contact}</h2>
          <p>{contactInfo}</p>
        </div>

        <p>
          <a className='button' href={`mailto:${email}`}>
            Email me
          </a>
        </p>
      </section>
    </div>
  );
}

export default ContactFinal;
