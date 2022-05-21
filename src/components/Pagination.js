import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled(props) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.handleChanges(value);
};

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={Math.ceil(props.totalPages/props.pageSize)} page={page} onChange={handleChange} />
    </Stack>
  );
}