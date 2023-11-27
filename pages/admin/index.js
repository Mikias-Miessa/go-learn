import {  useRouter } from 'next/router'
import {useEffect} from 'react'
const index = () => {
    const router = useRouter();
    
    
    useEffect(() => {
        router.push('/admin/dashboard')
     
    }, [])
    

  return (
    <div>Admin Page</div>
  )
}

export default index