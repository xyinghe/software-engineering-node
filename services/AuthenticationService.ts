import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();

// const PROTOCOL = "mongodb+srv";
// const DB_USERNAME = "giuseppi";//process.env.DB_USERNAME;
// const DB_PASSWORD = "supersecretpassword";//process.env.DB_PASSWORD;
// const HOST = "cluster0.m8jeh.mongodb.net";
// const DB_NAME = "myFirstDatabase";
// const DB_QUERY = "retryWrites=true&w=majority";
// const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
// mongoose.connect(connectionString);
mongoose.connect(`mongodb+srv://xyinghe:node123@cluster0.vu2ks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

export const login = (u: string, p: string) =>
    userDao.findUserByCredentials(u, p)
        .then(user => {
            if (user) {
                return user;
            } else {
                throw "Unknown user"
            }
        })
        .then(user => user)
        .catch(e => e)

export const register = (u: string, p: string, e: string) =>
    userDao.findUserByUsername(u)
        .then(user => {
            if (user) {
                throw 'User already exists';
            } else {
                return userDao.createUser({
                    username: u, password: p, email: e
                });
            }
        })
        .then(newUser => newUser)
        .catch(e => e);

export const initializeSalaries = (salary: number) => {
    return userDao.findAllUsers()
        .then(users => {
            const sPromises = users.map(user =>
                userDao.updateUserSalaryByUsername(user.username, salary));
            const resultPromise = Promise.all(sPromises);
            resultPromise
                .then(values => {
                    return values
                })
        })
}

export const giveRaise = (raise: number) => {
    return userDao.findAllUsers()
        .then(users => {
            const salaryPromises = users.map(user => {
                // @ts-ignore
                const newSalary = user.salary * (1 + raise / 100);
                return userDao.updateUserSalaryByUsername(
                    user.username,
                    newSalary)
            });
            const resultPromise = Promise.all(salaryPromises);
            resultPromise
                .then(values => {
                    return values;
                })
        })
}

login('alice008', 'alice234')
    .then(user => console.log(user))