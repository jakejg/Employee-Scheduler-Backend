import axios from 'axios';
import { 
    LOAD_STAFF,
    EDIT_STAFF
 } from './actionTypes';
import sortJobs from '../helpers/sortStaffJobs'


const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;

export const loadStaffFromAPI = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/users`);
            /* create an object of nested objects with data keyed by id */
            const staffData = {};
            for (let {id, username, first_name, last_name} of res.data.users) {

                staffData[id] = {
                    id,
                    username,
                    first_name,
                    last_name,
                    past_jobs: [],
                    scheduled_jobs: []
                }
            }
      
            dispatch(loadStaff(staffData));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const loadStaff = (staff) => {
    return {type: LOAD_STAFF, staff}
}


export const getStaffFromAPI = (ID) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/users/${ID}`);
            let {id, username, first_name, last_name, current_wage, years_at_company, jobs} = res.data.user

            let staff = {
                    id,
                    username,
                    first_name,
                    last_name,
                    current_wage, 
                    years_at_company,
                    current_job:  sortJobs(jobs).current,
                    past_jobs: sortJobs(jobs).past,
                    scheduled_jobs: sortJobs(jobs).future
                }
                console.log(staff)
                dispatch(editStaff(id, staff))
            }
        catch(e) {
            console.log(e)
        }
    }
}

export const editStaff = (id, staff) => {
    return {type: EDIT_STAFF, id, staff}
}