import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText, Box, Typography, makeStyles, ListItemIcon, Chip } from '@material-ui/core';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import moment from 'moment';
import Loading from './Loading';
import statusToColor from '../helpers/jobColorObj';

const useStyles = makeStyles(() => ({
    green: {
        color: 'green', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
    yellow: {
        color: '#f0ad4e', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
    red: {
        color: 'red', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
    text: {
        display: 'flex',
        justifyContent: 'start',
        width: '125px'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
    }
}))


const JobList = () => {
    const jobs = useSelector(state => state.jobs)
    const classes = useStyles();
    const loading = !Object.keys(jobs).length
    const statusColor = statusToColor();

    if (loading) return <Loading />

    let inProgress = {};
    let scheduled = {};
    for (let key in jobs){
        if (jobs[key].start_time > moment()){
            scheduled[key] = jobs[key]
        }
        else if (jobs[key].end_time > moment()){
            inProgress[key] = jobs[key]
        }
        
    }
    
    return (
        <div>
            <Typography variant='h4' align='center'>Jobs in Progress</Typography>
            <List>
                {Object.keys(inProgress).map(id => <ListItem key={id} className={classes.box}>
                                                        <Box  className={classes.text}>         
                                                            <Chip 
                                                            label={inProgress[id].title} 
                                                            component="a" href={`job/${id}`}
                                                            color="primary"
                                                            clickable />
                                                            <DoneOutlineRoundedIcon fontSize='small' className={classes[statusColor[inProgress[id].status]]}/>
                                                        </Box>
                                                    </ListItem>)}
            </List>
            <Typography variant='h4' align='center'>Jobs Scheduled</Typography>
            <List >
                {Object.keys(scheduled).map(id => <ListItem key={id} className={classes.box}>
                                                    <Box  className={classes.text}>
                                                        <Chip 
                                                            label={scheduled[id].title} 
                                                            component="a" href={`job/${id}`}
                                                            color="primary"
                                                            clickable
                                                            />
                                                        <DoneOutlineRoundedIcon fontSize='small' className={classes[statusColor[scheduled[id].status]]}/>
                                                    </Box> 
                                                    </ListItem>)}
            </List>

        </div>
    );
}

export default JobList;
