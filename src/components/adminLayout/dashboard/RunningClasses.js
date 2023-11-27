import * as React from 'react';
import Link from '../../Link';
import Typography from '@mui/material/Typography';
import Title from '../../Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function 
  return (
    <React.Fragment>
      <Title>Running Classes</Title>
      <Typography component="p" variant="h4">
       3
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        currently running classes
      </Typography>
      <div>
        <Link color="primary" href="/admin/classes" >
          View Classes
        </Link>
      </div>
    </React.Fragment>
  );
}