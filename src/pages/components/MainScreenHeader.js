import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const MainScreenHeader = ({ buttonLabel, link }) => {
  return (
    <div className="rounded my-3">
      <LinkContainer className="list-group-item" to={link}>
        <div className="py-3 mainscreen-button mb-1 text-nowrap">
          <span className="button-icon">
            <i className="bi bi-plus-circle"></i>
          </span>
          <span className="button-text">{buttonLabel}</span>
        </div>
      </LinkContainer>
    </div>
  );
};

export default MainScreenHeader;
