import bcrypt from 'bcryptjs'
import executeSql from '../mysql/database.js'
import jwtConfig from '../../../jwt.config.json';
import jwt from 'jwt-simple'
import delayPromise from '../../utils/delayPromise'

export function login(req) {
    let User_AccountName = req.body.accountName.toLowerCase();
    let User_AccountPassword = req.body.accountPassword;
    console.log('User_AccountName',User_AccountName)
    return delayPromise(1000) // Wait for a second to slow down a possible potential force attack
        .then(()=>new Promise((resolve, reject) => {
                let sqlStr = 'SELECT user.*,dict_user_type.user_type_name FROM user' +
                    ' LEFT JOIN dict_user_type ON dict_user_type.user_type_id = `user`.user_type_id' +
                    ' WHERE user_platform_name = ?';

                executeSql(sqlStr, [User_AccountName], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else if (rows.length == 0) {
                        reject("用户不存在");
                    }
                    else {
                        let user = rows[0];

                        bcrypt.compare(User_AccountPassword, user.user_platform_passwd, (err, User_AccountPasswordIsCorrect) => {
                            if (User_AccountPasswordIsCorrect) {
                                let user1 = {
                                    success: true,
                                    userName: User_AccountName,
                                    userId: user.user_id,
                                    userPhone: user.user_phone,
                                    userRealName: user.user_real_name,
                                    userType: user.user_type_name,
                                    userActived: user.user_activity,
                                    error: null
                                };
                                let token = jwt.encode(user1, jwtConfig.secret);//process.env.JWT_SECRET);
                                req.session.UserToken = token;
                                req.session.save();  //保存一下修改后的Session

                                resolve(user1)
                            }
                            else
                                reject('密码不正确');
                        })
                    }
                })
            })
        )
        .catch((reason) => {
            return Promise.resolve({
                success: false,
                userName: null,
                error: reason
            })
        })
}


export function Update_User(req) {
    let User_AccountName = req.body.accountName.toLowerCase();
    let User_AccountPassword = req.body.accountPassword;
    console.log('User_AccountName',User_AccountName)
    return delayPromise(1000) // Wait for a second to slow down a possible potential force attack
        .then(()=>new Promise((resolve, reject) => {
                let sqlStr = 'SELECT user.*,dict_user_type.user_type_name FROM user' +
                    ' LEFT JOIN dict_user_type ON dict_user_type.user_type_id = `user`.user_type_id' +
                    ' WHERE user_platform_name = ?';

                executeSql(sqlStr, [User_AccountName], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else if (rows.length == 0) {
                        reject("用户不存在");
                    }
                    else {
                        let user = {
                            success: true,
                            userName: User_AccountName,
                            userId: rows[0].user_id,
                            userPhone: rows[0].user_phone,
                            userRealName: rows[0].user_real_name,
                            userType: rows[0].user_type_name,
                            userActived: rows[0].user_activity,
                            error: null
                        }
                        resolve(user)
                    }
                })
            })
        )
        .catch((reason) => {
            return Promise.resolve({
                success: false,
                userName: null,
                error: reason
            })
        })
}