import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
        Drawer,
        List,
        Divider,
        IconButton,
        ListItem,
        ListItemIcon,
        ListItemText,
        Dialog,
        DialogTitle,
        Box
                }from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {changeDrawer} from '../actions/drawer';
import { useSelector, useDispatch } from 'react-redux';
import {addJobOnAPI} from '../actions/jobs';
import {addStaffOnAPI} from '../actions/staff'
import AddForm from './AddForm'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Sidebar = ({jobFields, staffFields}) => {
    const open = useSelector(state => state.application.drawer)
    const [dialog, setDialog] = useState({isOpen: false, type:""}) 
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useDispatch(); 

    
    const handleDrawerChange = () => {
        dispatch(changeDrawer())
    };


    const handleSideBarClick = (e) => {
        if (e.target.innerText === "Add Job"){
            setDialog(dialog => ({isOpen: true, type: "Job"}))
        }
        if (e.target.innerText === "Add Staff"){
            setDialog(dialog => ({isOpen: true, type: "Staff"}))
        }
    }
    const closeDialog = () => {
        setDialog(dialog => ({isOpen: false, type: ""}))
    }

return (
        <div className={classes.root}>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerChange}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List onClick={handleSideBarClick}>
                  {['Add Job', 'Add Staff', 'Check Dates'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                    {['View Calendar'].map((text, index) => (
                        <Link to='/calendar'>
                        <ListItem button key={text}>
                          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                        </Link>
                    ))}
                </List>
              </Drawer>
              <Dialog open={dialog.isOpen} onClose={closeDialog} fullWidth={true}>
                    <DialogTitle><Box textAlign='center' >Add a new {dialog.type}</Box></DialogTitle>
                    <AddForm type={dialog.type}
                      fields={dialog.type === 'Job' ? jobFields : staffFields}
                      addToDb={dialog.type === 'Job' ? addJobOnAPI : addStaffOnAPI} />
                  </Dialog>
        </div>
)
}
export default Sidebar;
