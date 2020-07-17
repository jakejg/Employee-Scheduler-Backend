const db = require('../db');
const ExpressError = require('../helpers/expressError');

class User {
    constructor({id, password, username, first_name, last_name, current_wage, years_at_company, is_admin}) {
        this.id = id;
        this.password = password;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.current_wage = current_wage
        this.years_at_company = years_at_company;
        this.is_admin = is_admin;
    }

    /* Method to retrieve all users */

    static async findAll() {
        const results = await db.query(
            `SELECT * FROM users
            ORDER BY first_name`
        )
        return results.rows
    }

    static async findOne(id) {
        const results = await db.query(
            `SELECT * from users 
            WHERE id=$1`, [id]
        )
        //join query for users. Ready to add when user data is set up
        // `SELECT * FROM users JOIN users_jobs ON users_jobs.user_id = users.id JOIN users ON users.id = users_jobs.job_id
        // WHERE users.id = $1`
        let user = results.rows[0];
        if (!user) throw new ExpressError(`User with id ${id} not found`, 400);
        else return new User(user);
    }

    /* Method to retrieve create a new user instance */

    static create(userData){
        return new User(userData); 
    }
    /* Method to update an existing user */

    static async update(id, userData){
        const user = await this.findOne(id);

        // loop through request body data, if the property exists on the user instance, update the instance
        for (let key in userData){
            if (user[key]) {
                user[key] = userData[key];
            }
        }
        return user

    }

    static async delete(id){
        const user = await this.findOne(id);
        const results = await db.query(
            `DELETE from users 
            WHERE id=$1`, [user.id]
        )

    }

    /* Method to add/update instance of user in the database */

    async save(){
        // if id doesn't yet exist, it is a new user and should be created, otherwise update the user
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO users
                (username, password, first_name, last_name, current_wage, years_at_company, is_admin)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`,
                [this.username, this.password, this.first_name, this.last_name, this.current_wage, this.years_at_company, this.is_admin]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
                return next(e);
            }
        }
        else {
             const results = await db.query(
            `UPDATE users SET username=$2, first_name=$3, last_name=$4, current_wage=$5, years_at_company=$6, is_admin=$7
            WHERE id=$1`, 
            [this.id, this.username, this.first_name, this.last_name, this.current_wage, this.years_at_company, this.is_admin]);
        
        }
    }

}

module.exports = User;