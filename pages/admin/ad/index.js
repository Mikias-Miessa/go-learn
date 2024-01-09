import AdminLayout from "../../../src/components/adminLayout"
import Ads from "../../../src/components/adminLayout/ad"
import withAuth from "../../../src/utils/withAuth"

const ads = () => {
  return (
   <AdminLayout title='Users' children={<Ads />}/>
  )
}


export default withAuth(ads)