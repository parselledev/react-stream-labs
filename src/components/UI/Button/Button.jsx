import React, {Component} from 'react';
import './Button.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Button = ({className = '', classMod, text='', icon, ...props}) => {
  const content = icon ?
    <React.Fragment>
      <FontAwesomeIcon icon={icon} className="c-btn__icon"/>
      <span>{text}</span>
    </React.Fragment>
    :
    text;

  return(
    <button
      className={`${className} c-btn c-btn--${classMod}`}
      {...props}>
        <div className="c-btn__content">
          {content}
        </div>
    </button>
  );
}

export default Button;