import AdminLayout from "../../../src/components/adminLayout"
import Instructors from "../../../src/components/adminLayout/instructors"
import withAuth from "../../../src/utils/withAuth"

const instructors = () => {
  return (
   <AdminLayout title='Users' children={<Instructors />}/>
  )
}


export default withAuth(instructors)