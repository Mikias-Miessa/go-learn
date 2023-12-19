import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import {useEffect} from 'react'
import Login from '../components/Login';
const withAuth = Component => {
    const Auth = (props) => {
      const router = useRouter()
  const {isAuthenticated, loading} = useSelector((state)=> state.auth)

      // useEffect(() => {
      //   if(!loading && !isAuthenticated){
      //     if (typeof window !== 'undefined') {
      //       router.push('/admin/')
      //     }
      //   }
      //     }, [isAuthenticated,loading])
  
      // If user is not logged in, return login component
      if ( !isAuthenticated) {
        return (
          <Login />
        );
      } else if (!loading) {
        return (
          <Login/>
        )
      }

  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;