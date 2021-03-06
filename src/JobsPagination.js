import React from 'react';
import {Pagination} from "react-bootstrap";

/* <Pagination.Ellipsis /> is the "..."

   Very smart way to rendering the pagination:
   If page is 1: it will show 1, 2, next
   If page is 2: it will show prev, 1, 2, 3, next
   If page is 3: it will show prev, 1, ..., 2, 3, 4, next
   If page is 4: it will show prev, 1, ..., 3, 4, 5, next
 */
const JobsPagination = ({page, setPage, hasNextPage}) => {
  function adjustPage(amount) {
    setPage(prevPage => prevPage + amount);
  }

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} /> }
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)} >1</Pagination.Item> }
      {page > 2 && <Pagination.Ellipsis /> }
      {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)} >{page - 1}</Pagination.Item> }
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => adjustPage(+ 1)} >{page + 1}</Pagination.Item> }
      {hasNextPage && <Pagination.Next onClick={() => adjustPage(+ 1)} /> }
    </Pagination>
  );
};

export default JobsPagination;
