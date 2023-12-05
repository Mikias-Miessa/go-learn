import AdminLayout from "../../src/components/adminLayout"
import Users from "../../src/components/adminLayout/users"
import withAuth from "../../src/utils/withAuth"

const users = () => {
  return (
   <AdminLayout title='Users' children={<Users />}/>
  )
}

// export default users
export default withAuth(users)