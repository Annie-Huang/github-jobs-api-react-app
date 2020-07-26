import React from 'react';
import {Card} from "react-bootstrap";

const Job = ({job}) => {
  return (
    <Card.Body>
      <div className="d-flex justify-content-between">
        <div>
          <Card.Title>
            {job.title}
          </Card.Title>
        </div>
      </div>
    </Card.Body>
  );
};

export default Job;
