import React from 'react';
import {Form, Col} from 'react-bootstrap';


/*
When you search for "Space" in Description: the URL will becomes:
http://localhost:3000/positions.json?markdown=true&page=1&description=Space

When you search for "Space" in Description and "UnitedStates" in Location: the URL will becomes:
http://localhost:3000/positions.json?markdown=true&page=1&description=Space&location=United+States

When you search for "Space" in Description and "UnitedStates" in Location and tick the checkbox on Only Full Time: the URL will becomes:
http://localhost:3000/positions.json?markdown=true&page=1&location=United+States&description=Space&full_time=true
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
          <Form.Check onChange={onParamChange} value={params.full_time} name="full_time" id='full-time' label="Only Full Time" type="checkbox" className="mb-2" />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
