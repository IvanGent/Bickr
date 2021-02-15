import React from 'react';
import './Footer.css';
import Github from '../../images/Github.png'
import AngelList from '../../images/angellist.png'
import LinkedIn from '../../images/LinkedIn.png'

const Footer = () => (
  <section className='footer'>
    <a href="https://github.com/IvanGent">
      Github
      <img src={Github} alt='github' />
    </a>
    <a href="https://www.linkedin.com/in/ivan-gentille-181630200/">
      LinkedIn
      <img src={LinkedIn} alt='LinkedIn' />
    </a>
    <a href="https://angel.co/u/ivan-gentille" >
      AngelList
      <img src={AngelList} alt='angellist' />
    </a>
    <a href="https://github.com/IvanGent/Bickr/blob/master/README.md" >README</a>
  </section>
  );

export default Footer;
