import bcrypt from 'bcryptjs'
import executeSql from '../mysql/database.js'
import jwtConfig from '../../../jwt.config.json';
import jwt from 'jwt-simple'
import uuid from 'uuid';

export function signup(req) {
    let User_AccountName = req.body.accountName.toLowerCase();
    let User_AccountPassword = req.body.accountPassword;
    let user_id= uuid.v4();

    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT * FROM user WHERE user_platform_name = ?';

        executeSql(sqlStr, [User_AccountName], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else if (rows.length > 0) {
                reject("用户已经存在");
            }
            else
                resolve();
        });
    })
    .then(()=> {
        return new Promise((resolve) => {
            bcrypt.hash(User_AccountPassword, 8, (err, User_AccountPassword) => resolve(User_AccountPassword));
        })
    })
    .then((User_AccountPassword) => {
            // If account name looks like email address, use it as email
            //const accountNameIsValidEmail = validateEmail(User_AccountName)
            //const User_Email = accountNameIsValidEmail ? User_AccountName : ''

            //User_AccountName: User_AccountName,
            //User_AccountPassword: User_AccountPassword,
            //UserToken2: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)

        return new Promise((resolve, reject) => {
            let sqlStr = 'INSERT INTO user ( user_platform_name, user_platform_passwd,user_id ) values (?,?,?)';

            executeSql(sqlStr, [User_AccountName, User_AccountPassword,user_id], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                //else if (rows.insertId)
                else {
                    resolve(rows.insertId);
                }
            });
        })
    })
    .then((userId) => {
        let user={
            success: true,
            userName: User_AccountName,
            error: null
        };
        // User has been created thus we create a JWT token
        let token = jwt.encode(user, jwtConfig.secret);//process.env.JWT_SECRET);
        req.session.UserToken = token;

        return Promise.resolve(user);
    })
    .catch((reason) => {
        return Promise.resolve({
            success:false,
            userName: null,
            error:reason
        })
    })
}
