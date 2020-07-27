import React from 'react';
import {Form, Col} from 'react-bootstrap';


/*
When you search for Management in Description: the URL will becomes:
http://localhost:3000/positions.json?markdown=true&page=2&[object+Object]=Management

When you search for Management in Location: the URL will becomes:
positions.json?markdown=true&page=1&[object+Object]=United+States
 */
const SearchForm = ({params, onParamChange}) => {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={onParamChange} value={params.description} name="description" type="text" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={onParamChange} value={params.location} name="location" type="text" />
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check onChange={onParamChange} value={params.full_time} name="full_time" label="Only Full Time" type="checkbox" className="mb-2" />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
