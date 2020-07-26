import React from 'react';
import {Pagination} from "react-bootstrap";

/* <Pagination.Ellipsis /> is the "..."

   Very smart way to rendering the pagination:
   If page is 1: it will show 1, 2, next
   If page is 2: it will show prev, 1, 2, 3, next
   If page is 3: it will show prev, 1, ..., 2, 3, 4, next
   If page is 4: it will show prev, 1, ..., 3, 4, 5, next
 */
const JobsPagination = ({page, setPage}) => {
  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev /> }
      {page !== 1 && <Pagination.Item>1</Pagination.Item> }
      {page > 2 && <Pagination.Ellipsis /> }
      {page > 2 && <Pagination.Item>{page - 1}</Pagination.Item> }
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Item>{page + 1}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};

export default JobsPagination;
