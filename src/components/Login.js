import {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import { toast} from 'react-toastify'
import Link from '../components/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Container,CircularProgress,Typography,Box,Grid,TextField,CssBaseline, Button,Avatar,Backdrop} from '@mui/material';
import {login,reset} from '../../store/authSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
       All rights reserved. Copyright © 2022 {' '}
      <Link color="inherit" href="/">
       Gobeze Consult
      </Link>.
    </Typography>
  );
}

export default function Login() {
const dispatch = useDispatch();
const router = useRouter()
const {user, isAuthenticated,isSuccess, loading, error,status} = useSelector((state)=> state.auth)
const [backdrop, setBackdrop] = useState(false);

useEffect(()=>{
  if(status==='pending'){
    setBackdrop(true)
  }
  if(status==='success' || status==='error'){
    setBackdrop(false)
  }
  if(error){

  
  // 
error.forEach(err =>{
  toast.error(err.msg)
})
}
if(isSuccess || user ){
  setBackdrop(false)

  toast.success('Login Success')
 
  // router.push('/admin/dashboard')
}
if( !loading && isAuthenticated){

  
  router.push('/admin/dashboard')
}
dispatch(reset)


},[user, isAuthenticated, error,loading,router,status,dispatch])


  const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const formData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  dispatch(login(formData));
};


  return (<>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Backdrop
        sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={backdrop}
      
      >
        <CircularProgress color="inherit" />
      </Backdrop>
              </>
  );
}