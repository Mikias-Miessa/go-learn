import Link from '../Link'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
// import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EventIcon from '@mui/icons-material/Event';
import { useDispatch, useSelector } from 'react-redux';



export default function MainListItems() {
const { user } = useSelector((state) => state.auth);

  return (
    <>
    <Link href="/admin/dashboard" color="primary">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />

      </ListItemButton>
    </Link>
    <Link href="/admin/classes" color="primary">
      <ListItemButton>
        <ListItemIcon>
          <BatchPredictionIcon />
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItemButton></Link>
    <Link href="/admin/courses" color="primary">
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton></Link>
    <Link href="/admin/schedules" color="primary">
      <ListItemButton>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Schedules" />
      </ListItemButton></Link>
    <Link href="/admin/students" color="primary">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Registrations" />
      </ListItemButton>
    </Link>
    <Link href="/admin/students/followup" color="primary">
      <ListItemButton >
        <ListItemIcon>
          <AddIcCallIcon />
        </ListItemIcon>
        <ListItemText primary="Followup" />
      </ListItemButton>
    </Link>
    <Link href="/admin/users" color="primary">
     {user && user.role && user.role === 'admin' && (
  <ListItemButton>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="Users" />
  </ListItemButton>
)}


    
    </Link>
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </>
  );
  
}

// export const secondaryListItems = (
//   <>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </>
// );