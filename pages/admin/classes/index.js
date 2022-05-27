import AdminLayout from "../../../src/components/adminLayout"
import Classes from "../../../src/components/adminLayout/classes"

const classes = () => {
  return (
   <AdminLayout title='Classes' children={<Classes />}/>
  )
}

export default classes