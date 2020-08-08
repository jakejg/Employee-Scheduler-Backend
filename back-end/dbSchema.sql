DROP TABLE IF EXISTS users_jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin boolean NOT NULL,
    current_wage INTEGER,
    years_at_company FLOAT,
    comp_id INTEGER REFERENCES companies ON DELETE CASCADE
);



CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    staff_filled boolean DEFAULT false,
    staff_needed INTEGER,
    notes TEXT,
    comp_id INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE
);

CREATE TABLE users_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs ON DELETE CASCADE, 
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO companies (name) 
VALUES ('Your Company Name');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id) 
VALUES ('15 day Mountain', '2020-07-04', '2020-07-19', 2, 'test', 1);

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id) 
VALUES ('20 day Mountain', '2020-08-10', '2020-08-30', 3, 'test2', 1);

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id) 
VALUES ('30 day Mountain', '2020-07-15', '2020-08-15', 3, 'test3', 1);


INSERT INTO users (username, password, first_name, last_name, is_admin, comp_id) 
VALUES ('Demo', '$2b$12$/D1ERcrzDjfy3QfHwRUgmO.Dyw091SAw19vWTNr.H4d6.PSn0ytFu', 'Demo', 'User', true, 1);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin, comp_id) 
VALUES ('Jon', 'Jon', 'Martin', 130, 3, false, 1);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin, comp_id) 
VALUES ('Sarah', 'Sarah', 'Brown', 100, 1, false, 1);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin, comp_id) 
VALUES ('Kim', 'Kim', 'Miller', 120, 2, false, 1);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin, comp_id) 
VALUES ('Stacy', 'Stacy', 'Lopez', 140, 4, false, 1);

INSERT INTO users (username, password, first_name, last_name, is_admin, comp_id) 
VALUES ('Matt', '$2b$12$/D1ERcrzDjfy3QfHwRUgmO.Dyw091SAw19vWTNr.H4d6.PSn0ytFu', 'Matt', 'Olsen', true, 1);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,2);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,3);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (1,2);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (3,2);
