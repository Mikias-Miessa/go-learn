import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Users from './Users';

export default function Dashboard() {
    return<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
     
      {/* Recent Users */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Users />
        </Paper>
      </Grid>
    </Grid>
  
  </Container>;
  }
  